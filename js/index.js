const menu = document.getElementById("menu");
const description = document.getElementById("description")

const stuff = {
	'About Me': `<h1>Hello, i am reimakesgames, i do things lol</h1>
	the way im doing this is kinda hacky rn cuz idk
	ikik innerHTML is bad but who cares? not like its gonna matter anyways

	the exploiters:
	<img src="https://media.tenor.com/giN2CZ60D70AAAAC/explosion-mushroom-cloud.gif">`,
	'Socials': `<h1>Socials</h1>
	idk im bored
	<a href='about:blank' target='_blank'>FUCK YOU</a>`
}

var isMouseOver = false
// var hasClicked = false

Array.from(document.getElementsByClassName("menu-item"))
	.forEach((item, index) => {
		item.onmouseover = () => {
			menu.dataset.activeIndex = index;
			isMouseOver = true
		}
		item.onmouseleave = () => {
			isMouseOver = false
		}
		item.onclick = () => {
			description.innerHTML = stuff[item.textContent]
			// hasClicked = true
		}
	});

// document.addEventListener('mousemove', (event) => {
// 	if (!hasClicked) {
// 		if (isMouseOver) {
// 			description.setAttribute('opacity', 1)
// 		} else {
// 			description.setAttribute('opacity', 0)
// 		}
// 	}
// })
