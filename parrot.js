/**
 * Parrot
 * An email autocomplete for mobile
 * https://github.com/diogo405/parrot
 * 
 * Author: Diogo Goncalves
 */
class Parrot {
	
	constructor(options) {

		this.options = options;
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
			onSelect: function(suggestion) { console.log(`Parrot > suggestion selected: ${suggestion.outerHTML}`); }
		};	

		this.config = Object.assign({}, this.default, this.options);
		this.bindInput();
	}

	get input() { return document.querySelector(this.config.inputSelector); }

	bindInput() {

		if (!this.input) {
			console.log(`Parrot > cannot find input with selector '${this.config.inputSelector}'`);
			return;
		}

		this.input.addEventListener('keyup', () => { this.handleInput() });
		this.input.addEventListener('focus', () => { this.handleInput() });
		this.input.addEventListener('blur', () => {	
			// So the blur happens after the click :/
			setTimeout(() => {
				this.clearSuggestions(); 
			}, 100);
		});
	}

	handleInput() {
		this.clearSuggestions();

		let email = this.input.value;
		let indexOfAt = email.indexOf("@");
		if (indexOfAt == -1) return;

		let substringAt = email.substring(indexOfAt + 1)
		if (substringAt.length == 0) return;

		let emailDomain = email.substring(indexOfAt + 1);
		let domainsFound = this.config.domains.filter(domain => domain.startsWith(emailDomain));
		if (domainsFound.length == 0) return;

		let emailUsername = email.substring(0, indexOfAt);
		let suggestions = domainsFound.map(domain => `${emailUsername}@${domain}`);
		this.showSuggestions(suggestions);
	}

	clearSuggestions() {
		let suggestions = document.querySelector('.parrot-suggestions');
		if (suggestions) {
			suggestions.parentNode.removeChild(suggestions);
		}
	}

	showSuggestions(suggestions) {
		let suggestionsContainer = document.createElement('div');
		suggestionsContainer.className = 'parrot-suggestions';
		this.input.parentNode.insertBefore(suggestionsContainer, this.input.nextSibling);

		suggestions.forEach(suggestion => {
			let suggestionElement = document.createElement('div');
			suggestionElement.className = 'parrot-suggestion';
			suggestionElement.onclick = () => { 
				this.input.value = suggestion;
				this.config.onSelect(suggestionElement);
				this.clearSuggestions();
			};
			suggestionElement.textContent = suggestion;
			suggestionsContainer.appendChild(suggestionElement);
		});
	}
}