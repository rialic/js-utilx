const rc = (function () {

    function empty(val) {
        if (typeof val === 'object') {
            if (val !== null) {
                const getObjectInstanceVal = () => Object.prototype.toString.call(val);

                const getArrayLength = () => val.length;
                const getObjectLength = () => Object.keys(val).length;

                const getObjectStringLength = () => {
                    if (val instanceof String) {
                        return getObjectLength();
                    }
                }

                const getObjectBooleanValueOf = () => {
                    if (val instanceof Boolean) {
                        return val.valueOf();
                    }
                }

                const getObjectNumberValueOf = () => {
                    if (val instanceof Number) {
                        return val.valueOf()
                    }
                }

                const _default = () => val.valueOf();

                const objectList = {
                    '[object Array]': getArrayLength,
                    '[object Object]': getObjectLength,
                    '[object NodeList]': getObjectLength,
                    '[object RadioNodeList]': getObjectLength,
                    '[object HTMLCollection]': getObjectLength,
                    '[object DOMTokenList]': getObjectLength,
                    '[object NamedNodeMap]': getObjectLength,
                    '[object String]': getObjectStringLength,
                    '[object Boolean]': getObjectBooleanValueOf,
                    '[object Number]': getObjectNumberValueOf,
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

        if (argumentsLength >= 1 && argumentsLength <= 2) {
            finalVal = firstArg;

            if (argumentsLength === 2) {
                initVal = firstArg;
                finalVal = secondArg;
            }

            return Math.floor(Math.random() * (finalVal - initVal + 1)) + initVal;
        }

        return null;
    }

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

    function cleanFields(form) {
        if (form.tagName === 'FORM') {
            const fields = form.querySelectorAll('input[type="text"], input[type="checkbox"], select, textarea');
            const reset = field => {
                field.checked = false;
                field.value = '';
            }

            fields.forEach(reset);
        }
    }

    function upperCaseFirst() {
        const inputs = document.querySelectorAll('.rc-uppercase-first');

        if (inputs.length !== 0) {
            const addUpperCaseFirstListener = inputarea => {
                const isInputTag = inputarea.tagName === 'INPUT';
                const isTextAreaTag = inputarea.tagName === 'TEXTAREA';

                if(isInputTag || isTextAreaTag) {
                    inputarea.addEventListener('input', convertToUpperCase);
                }
            }

            const convertToUpperCase = event => {
                const patternUpperCaseFirst = /^(.){0,1}/g;
                const inputareaVal = event.currentTarget.value;

                //TODO QUANDO SE APAGA A PRIMEIRA LETRA O CURSOR VAI PARA O FINAL DO TEXTO
                event.currentTarget.value = inputareaVal.replace(patternUpperCaseFirst, (letter) => {
                    const isFirstLetter = patternUpperCaseFirst.test(letter);
                    console.log(letter);
                    return letter.toUpperCase()
                });
            }

            inputs.forEach(addUpperCaseFirstListener);
        }
    }

    function upperCase() {
        const inputs = document.querySelectorAll('.rc-uppercase');

        if (inputs.length !== 0) {
            const addUpperCaseListener = inputarea => {
                const isInputTag = inputarea.tagName === 'INPUT';
                const isTextAreaTag = inputarea.tagName === 'TEXTAREA';

                if(isInputTag || isTextAreaTag) {
                    inputarea.addEventListener('input', convertToUpperCase);
                }
            }

            const convertToUpperCase = event => event.currentTarget.value = event.currentTarget.value.toUpperCase();

            inputs.forEach(addUpperCaseListener);
        }
    }

    function numericKeyboard() {
        const inputs = document.querySelectorAll('.rc-numeric-keyboard');
        const isAppleBrowser = /iPhone|iPad|iPod/i.test(navigator.userAgent);
        const isFirefoxBrowser = /firefox/i.test(navigator.userAgent);

        if (inputs.length !== 0) {
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
     * It remove spaces in the begin or end of input text and textarea while typing.
     */
    function space() {
        const inputs = document.querySelectorAll('textarea, input[type="text"]');

        const addInputEventListeners = input => {
            const removeSpaceOnInput = () => {
                const spacePattern = /^\s+/g;

                if (spacePattern.test(input.value)) {
                    input.value = input.value.replace(spacePattern, '');
                }
            }

            const removeSpaceOnBlur = () => {
                const spacePattern = /\s+$/g;

                if (spacePattern.test(input.value)) {
                    input.value = input.value.replace(spacePattern, '');
                }

                input.value.trim();
            }

            input.addEventListener('input', removeSpaceOnInput);
            input.addEventListener('blur', removeSpaceOnBlur);
        }

        inputs.forEach(addInputEventListeners);
    }

    return {
        empty: empty,
        random: random,
        serialize: serialize,
        cleanFields: cleanFields,
        upperCaseFirst: upperCaseFirst(),
        numericKeyboard: numericKeyboard(),
        upperCase: upperCase(),
        space: space()
    };

})();

