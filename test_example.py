# test_example.py

from vipentium import TestCase, parameters, mark, fixture

@fixture(scope="function")
def simple_list():
    """A simple list fixture."""
    return [1, 2, 3]

@fixture(scope="session")
def shared_resource():
    """A shared resource fixture across all tests in the session."""
    print("\nSetting up shared resource...")
    data = {"message": "Hello from shared resource"}
    yield data
    print("\nTearing down shared resource...")

@mark("basic")
class TestBasicOperations(TestCase):
    def test_addition(self):
        self.assert_equal(2 + 2, 4)

    def test_string_concat(self):
        self.assert_equal("hello" + "world", "helloworld")

    def test_list_length(self, simple_list):
        self.assert_equal(len(simple_list), 3)

    def test_shared_message(self, shared_resource):
        self.assert_equal(shared_resource["message"], "Hello from shared resource")

@mark("math")
class TestMathFunctions(TestCase):
    @parameters((5, 2, 7), (10, -3, 7), (0, 0, 0), name="addition_examples")
    def test_add_parameterized(self, a, b, expected):
        self.assert_equal(a + b, expected)

    def test_division(self):
        self.assert_equal(10 / 2, 5)

    def test_float_equality(self):
        self.assert_equal(3.14, 3.14)

@mark("list_operations")
class TestListManipulation(TestCase):
    def test_append(self, simple_list):
        simple_list.append(4)
        self.assert_equal(simple_list, [1, 2, 3, 4])

    def test_pop(self, simple_list):
        popped_item = simple_list.pop()
        self.assert_equal(popped_item, 3)
        self.assert_equal(simple_list, [1, 2])

    def test_contains(self, simple_list):
        self.assertTrue(2 in simple_list)
        self.assertFalse(5 in simple_list)

@mark("slow")
class TestSlowOperation(TestCase):
    def test_sleep(self):
        import time
        time.sleep(1)
        self.assertTrue(True)

@mark("needs_cleanup")
class TestWithSetupTeardown(TestCase):
    def setUp(self):
        print("\nSetting up test case with setup/teardown...")
        self.resource = "initialized"

    def test_resource_available(self):
        self.assert_equal(self.resource, "initialized")

    def tearDown(self):
        print("\nTearing down test case with setup/teardown...")
        del self.resource
