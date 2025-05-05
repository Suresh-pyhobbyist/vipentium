document.getElementById('vipentiumBadgeButton').addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default behavior, useful for right-clicks

    var badgeCode = document.getElementById('vipentiumBadgeCode');
    badgeCode.style.display = 'block'; // Temporarily reveal textarea
    badgeCode.select(); // Select its content
    document.execCommand('copy'); // Copy it to clipboard
    badgeCode.style.display = 'none'; // Hide textarea again

    var notification = document.getElementById('vipentiumNotification');
    notification.style.display = 'block'; // Show confirmation message
    setTimeout(function() {
        notification.style.display = 'none'; // Hide after 2 seconds
    }, 2000);
});

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const openIcon = mobileMenuButton.querySelector('.open-icon');
    const closeIcon = mobileMenuButton.querySelector('.close-icon');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        openIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
    });

    function copyToClipboard(elementId) {
        const element = document.getElementById(elementId);
        const text = element.textContent.trim();
        const copyButton = document.getElementById(`copy-button-${elementId.split('-').pop()}`);
        const copyMessage = document.getElementById(`copy-message-${elementId.split('-').pop()}`);

        navigator.clipboard.writeText(text)
            .then(() => {
                copyButton.classList.add('bg-vipentium-primary-green', 'text-white');
                copyButton.innerHTML = '<i class="fas fa-check"></i> Copied!';
                copyMessage.classList.remove('opacity-0');
                setTimeout(() => {
                    copyMessage.classList.add('opacity-0');
                    copyButton.classList.remove('bg-vipentium-primary-green', 'text-white');
                    copyButton.innerHTML = '<i class="fas fa-copy"></i> Copy';
                }, 1500);
            })
            .catch(err => {
                console.error('Could not copy text: ', err);
                alert('Could not copy text. Please try again.');
            });
    }

    document.addEventListener('DOMContentLoaded', () => {
        const revealElements = document.querySelectorAll('[data-reveal]');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    element.classList.remove('opacity-0', 'translate-y-[-10px]');
                    element.setAttribute('data-revealed', 'true');
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.2 });

        revealElements.forEach(element => {
            observer.observe(element);
        });
    });

    function copyToClipboard(elementId) {
const textToCopy = document.getElementById(elementId).textContent;

navigator.clipboard.writeText(textToCopy)
.then(() => {
  const copyButtonId = `copy-button-${elementId.split('-').pop()}`;
  const copyMessageId = `copy-message-${elementId.split('-').pop()}`;
  const copyButton = document.getElementById(copyButtonId);
  const copyMessage = document.getElementById(copyMessageId);

  if (copyMessage) {
    copyMessage.classList.remove('opacity-0');
    setTimeout(() => {
      copyMessage.classList.add('opacity-0');
    }, 1500);
  }
})
.catch(err => {
  console.error('Failed to copy text: ', err);
  alert('Failed to copy text to clipboard. Please try again.');
});
}

const terminalOutput = document.getElementById("vipentium-terminal-output");
    const commands = [
        "> Running vipentium-runner...",
        "> Discovering test files...",
        "> Executing test cases...",
        "✅ TestBasicOperations.test_addition (0.00s)",
        "✅ TestBasicOperations.test_list_length (0.00s)",
        "✅ TestBasicOperations.test_string_concat (0.00s)",
        "✅ TestMathFunctions.test_division (0.00s)",
        "❌ TestMathFunctions.test_complex_addition (0.00s) - TypeError: Missing argument",
        "🌟 Test Summary 🌟 | Total: 5 | Passed: 4 | Failed: 1 | Duration: 0.05s",
        "> Clearing test logs...",
        "> Restarting tests..."
    ];

    function typeCommands() {
        terminalOutput.innerHTML = ""; // Clears previous output before rewriting
        let index = 0;

        function writeLine() {
            if (index < commands.length) {
                const line = document.createElement("div");
                line.className = "vipentium-output-line truncate"; // Ensure no overflow
                line.innerHTML = commands[index];
                terminalOutput.appendChild(line);
                index++;
                setTimeout(writeLine, 1000);
            } else {
                setTimeout(typeCommands, 2000); // Restart test cycle after a brief pause
            }
        }

        writeLine();
    }

    typeCommands(); // Start animation loop

