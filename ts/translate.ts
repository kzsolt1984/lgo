/// <reference path="dictionary.ts" />

module trans {
    export class Translate {
        private _wordContent: HTMLElement;
        private _wordInput: HTMLInputElement;
        private _sendWordBtn: HTMLButtonElement;
        private _sayWord: HTMLButtonElement;
        private _defaultLang = "en"

        constructor() {
            console.log("Translate init done", Dictionary.getLength())

            this._wordContent = <HTMLElement>document.querySelector(".wordContent")
            this._wordInput = <HTMLInputElement>document.querySelector(".wordInput")
            this._sendWordBtn = <HTMLButtonElement>document.querySelector(".sendWord")
            this._sayWord = <HTMLButtonElement>document.querySelector(".sayWord")

            this._initHandlers()
            this.addRandomWord()
        }

        private _initHandlers() {
            this._sayWord.addEventListener("click", (ev: Event) => {
                var textContent = this._wordContent.textContent

                var msg = new SpeechSynthesisUtterance(textContent);
                window.speechSynthesis.speak(msg);

                ev.stopPropagation()
            });

            this._sendWordBtn.addEventListener("click", (ev: Event) => {
                var inputVal = this._wordInput.value
                var check = this._wordInput.getAttribute("data-label")

                if (inputVal === check) {
                    this.addRandomWord()
                    this._wordInput.value = ""
                }

                ev.stopPropagation()
            });

            this._wordInput.addEventListener("keyup", (ev: KeyboardEvent) => {
                if (ev.keyCode === 13) {
                    var inputVal = this._wordInput.value
                    var check = this._wordInput.getAttribute("data-label")

                    if (inputVal === check) {
                        this.addRandomWord()
                        this._wordInput.value = ""
                    }
                }

                ev.stopPropagation()
            });
        }

        private _getRandomWord() {
            var dLength = Dictionary.getLength()
            var min = Math.ceil(0);
            var max = Math.floor(dLength);
            var randNumber = Math.floor(Math.random() * (max - min)) + min

            return Dictionary.getRandomWord(randNumber)
        }

        private _addEnglishWord(word, translate) {
            this._wordContent.textContent = word;
            this._wordInput.setAttribute("data-label", translate)
        }

        public addRandomWord() {
            var word = this._getRandomWord()
            if (this._defaultLang === "en") {
                this._addEnglishWord(word[0], word[1])
            }
            else {
                this._addEnglishWord(word[1], word[0])
            }
        }
    }
}