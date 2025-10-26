function getRandomLower() {
  // floor向下取整， rendom生成0-1之间的随机数, 26个字母
  return String.fromCharCode(
    // 根据整数值，生成随机小写字母
    Math.floor(Math.random() * 26) + 97 // 97是a的ASCII码
  );
}

function getRandomUpper() {
  return String.fromCharCode(
    // 根据整数值，生成随机大写字母
    Math.floor(Math.random() * 26) + 65 // 65是A的ASCII码
  );
}

function getRandomNumber() {
  return String.fromCharCode(
    // 转成字符
    Math.floor(Math.random() * 10) + 48 // 48是0的ASCII码
  );
}

function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>?/,.";
  return symbols[Math.floor(Math.random() * symbols.length)]; //0-symbols.length-1
}

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = "";
  const typesCount = lower + upper + number + symbol; // 计算有几种类型
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );
  typesArr.forEach((value) => {
    console.log(Object.keys(value));
  });
  // 过滤掉false的类型,[{lower: true}, {upper: false}, {number: true}, {symbol: false}] => [{lower: true}, {number: true}]
  if (typesCount === 0) {
    return "";
  }
  console.log("length:" + length + " typesCount:" + typesCount);
  for (let i = 0; i < length; i += typesCount) {
    console.log("i=", i);
    //比如：长度6，类型3种upper,lower,number
    typesArr.forEach((type) => {
      console.log("Object.keys(type)[0]: " + Object.keys(type)[0]);
      //type {lower:true} -> [lower]->'lower'
      const funcName = Object.keys(type)[0]; // 获取类型的key
      generatedPassword += randomFunc[funcName](); // 调用对应的函数
    });
  }
  const finalPassword = generatedPassword.slice(0, length); // 截取前length个字符
  return finalPassword;
}

const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboardEl = document.getElementById("clipboard");

generateEl.addEventListener("click", () => {
  const length = Number(lengthEl.value); // 获取密码长度
  const hasLower = lowercaseEl.checked; // 是否包含小写字母
  const hasUpper = uppercaseEl.checked; // 是否包含大写字母
  const hasNumber = numbersEl.checked; // 是否包含数字
  const hasSymbol = symbolsEl.checked; // 是否包含符号

  resultEl.innerText = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );
});

clipboardEl.addEventListener("click", () => {
  const password = resultEl.innerText;
  if (!password) {
    return;
  }
  navigator.clipboard.writeText(password);
  alert("Password copied to clipboard: " + password);
});
