const rc = (function () {

    /**
     * Return true if variable is empty and false if not.
     * 
     * @param val Variable to be evaluated
     */
    function empty(val) {
        if (typeof val === 'object') {
            if (val !== null) {
                const getObjectInstanceVal = () => Object.prototype.toString.call(val);
                const getArrayLength = () => val.length;
                const getObjectLength = () => Object.keys(val).length;
                const _default = () => val.valueOf();

                const getValueOf = () => {
                    let valueOf;
                    const instanceList = [String, Boolean, Number];

                    for(let instan of instanceList){
                        if(val instanceof instan) {
                            valueOf = val.valueOf();
                            break;
                        }
                    }

                    return valueOf;
                }

                const objectList = {
                    '[object Array]': getArrayLength,
                    '[object Object]': getObjectLength,
                    '[object NodeList]': getObjectLength,
                    '[object RadioNodeList]': getObjectLength,
                    '[object HTMLCollection]': getObjectLength,
                    '[object DOMTokenList]': getObjectLength,
                    '[object NamedNodeMap]': getObjectLength,
                    '[object String]': getValueOf,
                    '[object Boolean]': getValueOf,
                    '[object Number]': getValueOf,
                    'default': _default
                };

                val = (objectList[getObjectInstanceVal()] || objectList['default'])();
            }
        }

        return !Boolean(val);
    }

    /**
     * Return the random number in a initial range and final range.
     * @param initVal It will be use to set the inital value in the range. (Optional)
     * @param finalVal If provided, it will be used to set the final value in the range.
     */
    function random(finalVal) {
        let initVal = 0;
        const argumentsLength = arguments.length;
        const firstArg = Math.trunc(arguments[0]);
        const secondArg = Math.trunc(arguments[1]);
        const generateRandomNumber = (argumentsLength, firstArg, secondArg) => {
            const lengthHasUpTwoArgs = argumentsLength >= 1 && argumentsLength <= 2;
            const lengthHasTwoArgs = argumentsLength === 2;

            if (lengthHasUpTwoArgs) {
                finalVal = firstArg;
    
                if (lengthHasTwoArgs) {
                    initVal = firstArg;
                    finalVal = secondArg;
                }
    
                return Math.floor(Math.random() * (finalVal - initVal + 1)) + initVal;
            }

            return null;
        }        

        return generateRandomNumber(argumentsLength, firstArg, secondArg);
    }

    /**
     * Serialize a json and return.
     * 
     * @param object Json to be serialized
     */
    function serialize(object) {
        let encodedString = '';

        for (let prop in object) {
            if (object.hasOwnProperty(prop)) {
                if (encodedString.length > 0) {
                    encodedString += '&';
                }

                encodedString += encodeURI(prop + '=' + object[prop]);
            }
        }

        return encodedString;
    }

    /**
     * Clear all fields inside a form
     * 
     * @param form Javascript form selector to clear all fields
     */
    function cleanFields(form) {
        const isFormTag = form.tagName === 'FORM';

        if (isFormTag) form.reset();
    }

    /**
     * It convert the first letter of text in Upper Case
     */
    function upperCaseFirst() {
        const inputs = document.querySelectorAll('[data-rc="first-uppercase"]');
        const patternUpperCaseFirst = /^[a-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšž∂ð]/;
        const hasUpperCaseFirstInputs = inputs.length !== 0;

        if (hasUpperCaseFirstInputs) {
            const addUpperCaseFirstListener = inputarea => {
                const isInputTag = inputarea.tagName === 'INPUT';
                const isTextAreaTag = inputarea.tagName === 'TEXTAREA';

                if(isInputTag || isTextAreaTag) {
                    inputarea.addEventListener('input', handleConvertToUpperCase);
                }
            }

            const handleConvertToUpperCase = event => {
                const inputArea = event.currentTarget;
                const inputareaVal = inputArea.value;
                const hasLetter = patternUpperCaseFirst.test(inputareaVal);
                
                if(hasLetter) {
                    const focusStartPos = inputArea.selectionStart;
                    const focusEndPos = inputArea.selectionEnd;

                    inputArea.value = inputareaVal.replace(patternUpperCaseFirst, letter => letter.toUpperCase());

                    inputArea.setSelectionRange(focusStartPos, focusEndPos);
                }
            }

            inputs.forEach(addUpperCaseFirstListener);
        }
    }

    /**
     * It convert all text in Upper Case letters
     */
    function upperCase() {
        const inputs = document.querySelectorAll('[data-rc="uppercase"]');
        const hasUpperCaseInputs = inputs.length !== 0;

        if (hasUpperCaseInputs) {
            const addUpperCaseListener = inputarea => {
                const isInputTag = inputarea.tagName === 'INPUT';
                const isTextAreaTag = inputarea.tagName === 'TEXTAREA';

                if(isInputTag || isTextAreaTag) inputarea.addEventListener('input', handleConvertToUpperCase);
            }

            const handleConvertToUpperCase = event => event.currentTarget.value = event.currentTarget.value.toUpperCase();

            inputs.forEach(addUpperCaseListener);
        }
    }

    /**
     * It show numeric keyboard on mobile phones
     */
    function numericKeyboard() {
        const inputs = document.querySelectorAll('[data-rc="numeric-keyboard"]');
        const isAppleBrowser = /iPhone|iPad|iPod/i.test(navigator.userAgent);
        const isFirefoxBrowser = /firefox/i.test(navigator.userAgent);
        const hasNumericInputs = inputs.length !== 0;

        if (hasNumericInputs) {
            const handleNumericAttributes = input => {
                const isInputTag = input.tagName === 'INPUT';
                const isTextAreaTag = inputarea.tagName === 'TEXTAREA';

                if(isInputTag || isTextAreaTag) {
                    input.setAttribute('pattern', '[0-9\-]*');
                    input.setAttribute('inputmode', 'numeric');
                    input.removeAttribute('type');
    
                    if (isAppleBrowser) {
                        input.removeAttribute('inputmode');
                    }
    
                    if (isFirefoxBrowser) {
                        input.removeAttribute('inputmode');
                        input.removeAttribute('pattern');
                        input.setAttribute('type', 'tel');
                    }
                }
            }

            inputs.forEach(handleNumericAttributes);
        }
    }

    /**
     * It remove spaces in the begin and end of input text and textarea while typing.
     */
    function space() {
        const inputs = document.querySelectorAll('textarea, input[type="text"]');

        const addInputEventListeners = input => {
            const handleRemoveSpaceOnInput = () => {
                const spacePattern = /^\s+/g;
                const hasSpaceInBeginning = spacePattern.test(input.value);

                if (hasSpaceInBeginning) input.value = input.value.replace(spacePattern, '');
            }

            const handleRemoveSpaceOnBlur = () => input.value = input.value.trim();

            input.addEventListener('input', handleRemoveSpaceOnInput);
            input.addEventListener('blur', handleRemoveSpaceOnBlur);
        }

        inputs.forEach(addInputEventListeners);
    }

    return {
        empty,
        random,
        serialize,
        cleanFields,
        space: space(),
        upperCase: upperCase(),
        upperCaseFirst: upperCaseFirst(),
        numericKeyboard: numericKeyboard()
    };

})();

