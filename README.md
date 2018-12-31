# Parrot 

An email autocomplete for mobile

![parrot](https://github.com/diogo405/parrot/blob/master/parrot-screenshot.png?raw=true)

## How to use it 🤔

1. Add 'js-parrot' class to your email input (you can change the selector, see section below)
2. Put parrot.js script (only 2kb) in your page 
3. Instantiate it
4. Style it as you like :)

```
<html>
  <body>
    .
    .
    .
    <input class="js-parrot" name="customerEmail" type="email">
    .
    .
    .
    <script src="parrot.js"></script>
    <script>
      new Parrot();
    </script>
    </body>
</html>
```


## Options

The default configuration is: 

```
this.default = {
  inputSelector: '.js-parrot',
  domains: [
    "gmail.com",
    "hotmail.com",
    "yahoo.com",
    "outlook.com",
    "live.com",
    "icloud.com",
    "msn.com",
  ],
  onSelect: function(suggestion) { 
    console.log(`Parrot > suggestion selected: ${suggestion.outerHTML}`); 
  }
};	
```

You can override that passing a JSON object as a param:

```
new Parrot({
  inputSelector: 'input[name="email"]',
  domains: ["gmail.com", "yahoo.com", "yahoo.com.au"],
  onSelect: function() {
    document.dispatchEvent(new Event("email-suggestion-selected"));
  }
})
```

## CSSing

Parrot is gonna create a div after your email input with all the suggestions. The container is gonna be a "div.parrot-suggestions". Each suggestion inside the container is gonna be "div.parrot-suggestion" (w/out 's').

CSS example:
```
.parrot-suggestions {
  background: white;
  width: 400px;
  margin: auto;
  border: 2px solid black;
  box-sizing: border-box;
  padding: 10px;
}
.parrot-suggestion {
  margin-top: 10px;
  cursor: pointer;
  color: grey;
}
.parrot-suggestion:first-child {
  margin-top: 0;
}
```

## Html Sample

Download and run sample.html in your browser 👍🏽


## License

This project is licensed under the 🐦 License️
