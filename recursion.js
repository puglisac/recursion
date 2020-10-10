/** product: calculate the product of an array of numbers. */

function product(nums) {
  if(nums.length === 0) return 1;
  return nums[0]*product(nums.slice(1));
}

/** longest: return the length of the longest word in an array of words. */

function longest(words, size=0) {
  if(words.length===0){
    return size;
  }else if(words[0].length>size){
      return longest(words.filter(word=>word!=words[0]), words[0].length);
  }else{
    return longest(words.filter(word=>word!=words[0]), size);
  }
}

/** everyOther: return a string with every other letter. */

function everyOther(str) {
  if(str.length === 0) return "";
  return str[0]+everyOther(str.slice(2));
}

/** isPalindrome: checks whether a string is a palindrome or not. */

function isPalindrome(str, idx=0) {
  let leftIdx = idx;
  let rightIdx = str.length - idx - 1;
  if (leftIdx >= rightIdx) return true;
  if (str[leftIdx] !== str[rightIdx]) return false;
  return isPalindrome(str, idx + 1);
}

/** findIndex: return the index of val in arr (or -1 if val is not present). */

function findIndex(arr, val, i=0) {
  if(i>arr.length){
    return -1;
  }
  if(arr[i]===val){
    return i;
  }return findIndex(arr, val, i+1);
}

/** revString: return a copy of a string, but in reverse. */

function revString(str, i=str.length-1) {
  if(i<0) return "";
  return str[i]+revString(str, i-1);
}

/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj) {
  const strArr=[];
  for (let key in obj) {
    if (typeof obj[key] === "string") strArr.push(obj[key]);
    if (typeof obj[key] === "object") strArr.push(...gatherStrings(obj[key]));
  }
  return strArr;
}

/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */

function binarySearch(arr, val, left=0, right=arr.length) {
  if(left>right)return -1;
  const mid = Math.floor((left+right)/2);
  if(arr[mid]===val){
    return mid;
  }else if(arr[mid]>val){
    return binarySearch(arr, val, left, mid-1)
  }else{
    return binarySearch(arr, val, mid+1, right )
  }
}

module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings,
  binarySearch
};
