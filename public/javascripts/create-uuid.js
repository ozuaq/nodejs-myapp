let getUuid = () => {
    const multiplier = 1000;
    return new Date().getTime().toString(16) + Math.floor(multiplier*Math.random()).toString(16);
}


// test
console.log(getUuid());