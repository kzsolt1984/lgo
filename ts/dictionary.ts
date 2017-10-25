module trans {
  var dictionary = {
      "in order to organise": "annak érdekében, hogy",
      "dig": "ás",
      "nap": "szieszta",
      "wheelbarrow": "talicska"
  }

  export class Dictionary {
    public static dict = dictionary;

    public static get(key: string): string {
      return Dictionary.dict[key] ? Dictionary.dict[key] : null
    }

    public static getLength(): number {
        var count = 0;

        for (var i in Dictionary.dict) {
            count++;
        }

        return count;
    }

    public static getRandomWord(randNumber) {
        var returnArr = [];
        var count = 0;
        console.log(randNumber)
        for (var i in Dictionary.dict) {
            if (count === randNumber) {
                returnArr.push(i)
                returnArr.push(Dictionary.dict[i])
                return returnArr
            }
            count++;
        }
    }
  }
}