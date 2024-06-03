export default {
  englishToBangla(input) {
    let str = typeof input === "string" ? input : String(input);

    let banglaNumber = {
      0: "০",
      1: "১",
      2: "২",
      3: "৩",
      4: "৪",
      5: "৫",
      6: "৬",
      7: "৭",
      8: "৮",
      9: "৯",
      PM: "পিএম",
      AM: "এএম",
      null: "",
    };

    for (var x in banglaNumber) {
      str = str.replace(new RegExp(x, "g"), banglaNumber[x]);
    }
    return str;
  },
  formatDate: (date, locale) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Intl.DateTimeFormat(locale, options).format(new Date(date));
  },
};
