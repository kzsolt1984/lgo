var trans;
(function (trans) {
    var dictionary = {
        "in order to organise": "annak érdekében, hogy",
        "dig": "ás",
        "nap": "szieszta",
        "wheelbarrow": "talicska"
    };
    var Dictionary = (function () {
        function Dictionary() {
        }
        Dictionary.get = function (key) {
            return Dictionary.dict[key] ? Dictionary.dict[key] : null;
        };
        Dictionary.getLength = function () {
            var count = 0;
            for (var i in Dictionary.dict) {
                count++;
            }
            return count;
        };
        Dictionary.getRandomWord = function (randNumber) {
            var returnArr = [];
            var count = 0;
            console.log(randNumber);
            for (var i in Dictionary.dict) {
                if (count === randNumber) {
                    returnArr.push(i);
                    returnArr.push(Dictionary.dict[i]);
                    return returnArr;
                }
                count++;
            }
        };
        Dictionary.dict = dictionary;
        return Dictionary;
    }());
    trans.Dictionary = Dictionary;
})(trans || (trans = {}));
/// <reference path="dictionary.ts" />
var trans;
(function (trans) {
    var Translate = (function () {
        function Translate() {
            this._defaultLang = "en";
            console.log("Translate init done", trans.Dictionary.getLength());
            this._wordContent = document.querySelector(".wordContent");
            this._wordInput = document.querySelector(".wordInput");
            this._sendWordBtn = document.querySelector(".sendWord");
            this._initHandlers();
            this.addRandomWord();
        }
        Translate.prototype._initHandlers = function () {
            var _this = this;
            this._sendWordBtn.addEventListener("click", function (ev) {
                var inputVal = _this._wordInput.value;
                var check = _this._wordInput.getAttribute("data-label");
                if (inputVal === check) {
                    _this.addRandomWord();
                    _this._wordInput.value = "";
                }
                ev.stopPropagation();
            });
        };
        Translate.prototype._getRandomWord = function () {
            var dLength = trans.Dictionary.getLength();
            var min = Math.ceil(0);
            var max = Math.floor(dLength);
            var randNumber = Math.floor(Math.random() * (max - min)) + min;
            return trans.Dictionary.getRandomWord(randNumber);
        };
        Translate.prototype._addEnglishWord = function (word, translate) {
            this._wordContent.textContent = word;
            this._wordInput.setAttribute("data-label", translate);
        };
        Translate.prototype.addRandomWord = function () {
            var word = this._getRandomWord();
            if (this._defaultLang === "en") {
                this._addEnglishWord(word[0], word[1]);
            }
            else {
                this._addEnglishWord(word[1], word[0]);
            }
        };
        return Translate;
    }());
    trans.Translate = Translate;
})(trans || (trans = {}));
/// <reference path="translate.ts" />
document.addEventListener("DOMContentLoaded", function (event) {
    var transClass = new trans.Translate();
});
//# sourceMappingURL=main.js.map