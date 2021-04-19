const rc = (function () {

    /**
     * Return true if variable is empty or false if not.
     * @param {Object} val - Value to be evaluated
     * @returns {boolean}
     */
    const empty = val => {
        if (typeof val === 'object') {
            if (val !== null) {
                const getObjectInstanceVal = () => Object.prototype.toString.call(val);
                const getArrayLength = () => val.length;
                const getObjectLength = () => Object.keys(val).length;
                const _default = () => val.valueOf();
                const getValueOf = () => {
                    let valueOf;
                    const instanceList = [String, Boolean, Number];

                    for (let instan of instanceList) {
                        if (val instanceof instan) {
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
     * @param {number} initVal - It will be use to set the inital value in the range. (Optional)
     * @param {number} finalVal - If provided, it will be used to set the final value in the range.
     * @returns {number} - Number chosen
     */
    const random = (...args) => {
        let initVal = 0;
        let firstArg = args[0];
        let secondArg = args[1];
        const argsLengthEqualTwo = args.length === 2;
        const isNumberFirstArg = typeof firstArg === 'number';
        const isNumberSecondArg = (argsLengthEqualTwo) ? typeof secondArg === 'number' : true;

        if (isNumberFirstArg && isNumberSecondArg) {
            firstArg = Math.trunc(firstArg);
            secondArg = Math.trunc(secondArg);

            finalVal = firstArg;

            if (argsLengthEqualTwo) {
                initVal = firstArg;
                finalVal = secondArg;
            }

            return Math.floor(Math.random() * (finalVal - initVal + 1)) + initVal;
        }

        return;
    }

    /**
     * Serialize a json and return.
     * @param {Object} object - JSON to be serialized
     * @returns {string} - String serialized from object
     */
    const serialize = object => {
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
     * @param {Object} form - HTML Form to clear all fields
     */
    const cleanFields = form => {
        const isFormTag = form.tagName === 'FORM';

        if (isFormTag) form.reset();
    }

    /**
     * Return HTML element with attributes and return it.
     * @typedef {Object} HTML - HTML
     * @param {string} elementName - Given name to html element.
     * @param {Object.<string, string|number>} attributes - Attributes from HTML element.
     * @returns {HTML} - HTML element made
     */
    const makeElement = (elementName, attributes = {}) => {
        const isValidStringEl = typeof elementName === 'string' && Boolean(elementName);
        const isValidObjectAttr = typeof attributes === 'object' && Boolean(attributes);

        if (isValidStringEl && isValidObjectAttr) {
            const element = document.createElement(elementName);
            const attributeList = Object.entries(attributes);
            const defineElementAttr = ([key, value]) => element.setAttribute(key, value);

            attributeList.forEach(defineElementAttr);

            return element;
        }

        return;
    }

    /**
     * It convert the first letter of text in Upper Case
     */
    const upperCaseFirst = () => {
        const inputsEl = document.querySelectorAll('[data-rc="first-uppercase"]');

        const patternUpperCaseFirst = /^[a-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšž∂ð]/;
        const hasUpperCaseFirstInputsEl = inputsEl.length !== 0;

        if (hasUpperCaseFirstInputsEl) {
            const defineUpperCaseFirstListener = inputEl => {
                const isInputEl = inputEl.tagName === 'INPUT';
                const isTextAreaEl = inputEl.tagName === 'TEXTAREA';

                if (isInputEl || isTextAreaEl) {
                    inputEl.addEventListener('input', handleConvertToUpperCase);
                }
            }

            const handleConvertToUpperCase = event => {
                const inputEl = event.target;
                const hasLetter = patternUpperCaseFirst.test(inputEl.value);

                if (hasLetter) {
                    const focusStartPos = inputEl.selectionStart;
                    const focusEndPos = inputEl.selectionEnd;

                    inputEl.value = inputEl.value.replace(patternUpperCaseFirst, letter => letter.toUpperCase());

                    inputEl.setSelectionRange(focusStartPos, focusEndPos);
                }
            }

            inputsEl.forEach(defineUpperCaseFirstListener);
        }
    }

    /**
     * It convert all text in Upper Case letters
     */
    const upperCase = () => {
        const inputsEl = document.querySelectorAll('[data-rc="uppercase"]');
        const hasUpperCaseInputs = inputsEl.length !== 0;

        if (hasUpperCaseInputs) {
            const handleConvertToUpperCase = event => {
                event.target.value = event.target.value.toUpperCase();
            }

            const defineUpperCaseListener = inputEl => {
                const isInputEl = inputEl.tagName === 'INPUT';
                const isTextAreaEl = inputEl.tagName === 'TEXTAREA';

                if (isInputEl || isTextAreaEl) inputEl.addEventListener('input', handleConvertToUpperCase);
            }

            inputsEl.forEach(defineUpperCaseListener);
        }
    }

    /**
     * It show numeric keyboard on mobile phones
     */
    const numericKeyboard = () => {
        const inputsEl = document.querySelectorAll('[data-rc="numeric-keyboard"]');

        const isAppleBrowser = /iPhone|iPad|iPod/i.test(navigator.userAgent);
        const isFirefoxBrowser = /firefox/i.test(navigator.userAgent);
        const hasNumericInputs = inputsEl.length !== 0;

        if (hasNumericInputs) {
            const handleNumericAttributes = inputEl => {
                const isInputEl = inputEl.tagName === 'INPUT';
                const isTextAreaEl = inputEl.tagName === 'TEXTAREA';

                if (isInputEl || isTextAreaEl) {
                    inputEl.setAttribute('pattern', '[0-9\-]*');
                    inputEl.setAttribute('inputmode', 'numeric');
                    inputEl.removeAttribute('type');

                    if (isAppleBrowser) {
                        inputEl.removeAttribute('inputmode');
                    }

                    if (isFirefoxBrowser) {
                        inputEl.removeAttribute('inputmode');
                        inputEl.removeAttribute('pattern');
                        inputEl.setAttribute('type', 'tel');
                    }
                }
            }

            inputsEl.forEach(handleNumericAttributes);
        }
    }

    /**
     * It remove spaces in the begin and end of input text and textarea while typing.
     */
    const space = () => {
        const inputsEl = document.querySelectorAll('textarea, input[type="text"]');

        const defineInputEventListener = inputEl => {
            const handleRemoveSpaceOnInput = () => {
                const spacePattern = /^\s+/g;
                const hasSpaceInBeginning = spacePattern.test(inputEl.value);

                if (hasSpaceInBeginning) {
                    inputEl.value = inputEl.value.replace(spacePattern, '');
                }
            }

            const handleRemoveSpaceOnBlur = () => {
                inputEl.value = inputEl.value.trim();
            }

            inputEl.addEventListener('input', handleRemoveSpaceOnInput);
            inputEl.addEventListener('blur', handleRemoveSpaceOnBlur);
        }

        inputsEl.forEach(defineInputEventListener);
    }

    return {
        empty,
        random,
        serialize,
        cleanFields,
        makeElement,
        space: space(),
        upperCase: upperCase(),
        upperCaseFirst: upperCaseFirst(),
        numericKeyboard: numericKeyboard()
    };
})();
