function getButtonValue(selector) {
    const selectedElements = document.querySelectorAll(selector);
    const tagNameLower = [];

    // Check tags for given selectors
    selectedElements.forEach(element => {
        const elementTag = element.tagName.toLowerCase();
        tagNameLower.push(elementTag);
    })
    if (tagNameLower.length > 1) {
        throw new Error(`current selector ${selector} contains more than 1 type tag`);
    }
    if (selectedElements.length === 0) {
        throw new Error(`Could not find selector ${selector}`)
    } else if (selectedElements.length > 1) {
        console.log(`Selector ${selector} yielded more than 1 element.`)
        console.log("Fetching the value from the first ele.")
    }
    return selectedElements[0].innerHTML
    
}

function convertStringToNumber(value) {
    const numberValue = Number(value);
    if (!isNaN(numberValue)) {
        return numberValue;
    } else {
        return value;
    }
}

function calculate() {
    const numbers = () =>{
        const arr = []
        for (i = 0; i <= 9; i++) {
            arr.push(i.toString())
        }
        return arr
    }
    const stringInts = numbers();

    // Define calculator elements
    const calculatorButtons = document.querySelectorAll(".input-btn, .operator-btn");
    const output = document.getElementById("output")
    let outputValue = output.innerHTML
    let calculationValueArr = new Array()

    calculatorButtons.forEach(element => {
        element.addEventListener("click", event => {
            let clickedEleVal = element.innerHTML
            console.log("clicked on", convertStringToNumber(clickedEleVal));

            // Ouput update when numbers clicked
            if (stringInts.includes(clickedEleVal)){
                if (output.innerHTML === "0") {
                    outputValue = clickedEleVal
                } else {
                    outputValue += clickedEleVal
                }
            // Reset output when C clicked
            }
            if (element.className === "input-btn mod reset") {
                outputValue = "0"
            }

            // Remove 1 num on backspace
            if (element.className === "input-btn mod clear") {
                outputValue = outputValue.slice(0, -1)
            }
            // Push to stack when operator clicked
            if (element.className === "operator-btn divisor") {
                calculationValueArr.push(convertStringToNumber(outputValue))
                calculationValueArr.push("/")
                outputValue = "0"
            }
            if (element.className === "operator-btn multiplier") {
                calculationValueArr.push(convertStringToNumber(outputValue))
                calculationValueArr.push("*")
                outputValue = "0"
            }
            if (element.className === "operator-btn minus") {
                calculationValueArr.push(convertStringToNumber(outputValue))
                calculationValueArr.push("-")
                outputValue = "0"
            }
            if (element.className === "operator-btn plus") {
                calculationValueArr.push(convertStringToNumber(outputValue))
                calculationValueArr.push("+")
                outputValue = "0"
            }

            output.innerHTML = outputValue
            console.log(output.innerHTML)
            // Perform calculation on "=" click
            if (element.className === "operator-btn equals") {
                calculationValueArr.push(convertStringToNumber(outputValue));
                let calculationValue = eval(calculationValueArr.join(' '));
                output.innerHTML = calculationValue;
                // reset output + calculationArr
                outputValue = "0";
                calculationValueArr = [];
            }
        });
    });
}

function copyResults () {
    let copyButtonClicked = false
    // Display tooltip on hover
    const tooltipText = document.querySelector(".tooltip-text")
    const defaultTooltip = tooltipText.innerHTML
    const copyButton = document.querySelector(".copy-output")

    copyButton.addEventListener("mouseover", () => {
        const buttonRect = copyButton.getBoundingClientRect();
        tooltipText.style.display = "flex";
        tooltipText.style.left = buttonRect.left + (buttonRect.width - tooltipText.offsetWidth) / 2 + "px";
        tooltipText.style.top = buttonRect.top + tooltipText.offsetHeight - 100 + "px";

    });

    copyButton.addEventListener("mouseleave", () => {
        if (!copyButtonClicked) {
        tooltipText.style.display = "none";
        }
    });
    // Copy results to clipboard
    copyButton.addEventListener("click", () => {
        copyButtonClicked = true
        console.log("Copy button clicked: ", copyButtonClicked)
        
        // Copy output and update click status
        let copiedContent = () => {
            const output = document.getElementById("output")
            navigator.clipboard.writeText(output.innerHTML);
            console.log(`Copied ${output.innerHTML} to clipboard`);
        }
        // Update tooltip
        tooltipText.style.color = "green"
        tooltipText.innerHTML = "&#10003; Results copied!"
        
        const buttonRect = copyButton.getBoundingClientRect();
        tooltipText.style.display = "flex";
        tooltipText.style.left = buttonRect.left + (buttonRect.width - tooltipText.offsetWidth) / 2 + "px";
        tooltipText.style.top = buttonRect.top + tooltipText.offsetHeight - 100 + "px";

        copiedContent();
        
        // Reset display and click status after 3s
        setTimeout(() => {
            tooltipText.style.display = "none";
            tooltipText.style.color = ""; // Reset color or set to default color
            tooltipText.innerHTML = defaultTooltip; // Reset to original text
            copyButtonClicked = false
        }, 3000);

    });
}

// Calculate the output based on inputs listeners
calculate();

// Update style for copy tooltip + copy value
copyResults();
