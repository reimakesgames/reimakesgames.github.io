function NewElement(props, children) {
	let element = document.createElement(props.targetTag)
	element.textContent = props.targetText
	if (props.ad) {
		element.setAttribute('style', `animation-delay: ${props.ad}s;`)
	}
	if (props.targetClass) {
		element.classList.add(props.targetClass)
	}
	if (props.href) {
		element.setAttribute('href', props.href)
	}
	if (props.target) {
		element.setAttribute('target', props.target)
	}
	if (props.backgroundimage) {
		element.setAttribute('src', props.backgroundimage)
	}
	if (props.backgroundcolor) {
		element.setAttribute('style', `background-color: ${props.backgroundcolor}BF;
		border: 1px solid ${props.backgroundcolor}`)
	}
	props.targetParent.appendChild(element)
	if (children !== undefined || children !== null) {
		if (children.length > 0) {
			children.forEach((childProps, index) => {
				if (childProps === undefined) {
					return;
				}
				if (!('children' in childProps)) {
					childProps.children = []
				}
				childProps.targetParent = element
				NewElement(childProps, childProps.children)
			});
		}
	}
	return element
}
setTimeout(() => {
	fetch('https://api.github.com/repos/reimakesgames/hybrid-conflict/issues')
	.then((response) => response.json())
	.then((data) => {
		console.log(data)
		NewElement({
			targetParent: document.body,
			targetTag: 'div',
			targetClass: 'sectionTitles',
			targetText: 'Issues'
		}, [])
		let issuesContainer = NewElement({
			targetParent: document.body,
			targetTag: 'div',
			targetClass: 'issuesContainer'
		}, [])
		let curr = 0
		data.forEach((result, index) => {
			let thing
			let tags = []
			if (result.body !== null) {
				thing = {
					targetTag: 'div',
					targetClass: 'issueContent',
					targetText: result.body
				}
			}
			if (result.labels.length >= 0) {
				result.labels.forEach((res, ind) => {
					tags.splice(tags.length - 1, 0, {
						targetTag: 'span',
						targetClass: 'tag',
						targetText: res.name,
						backgroundcolor: '#'+res.color
					})
				});
			}
			if (!result.pull_request) {
				curr = curr + 1
				let obj = NewElement({
					targetParent: issuesContainer,
					targetTag: 'div',
					targetClass: 'issueContainer',
					ad: curr * 0.05,
				}, [
					{
						targetTag: 'div',
						targetClass: 'wrapper',
						children: [
							{
								targetTag: 'img',
								targetClass: 'profile',
								backgroundimage: result.user.avatar_url,
							},
							{
								targetTag: 'a',
								targetClass: 'issueTitle',
								targetText: result.title,
								href: result.html_url,
								target: '_blank'
							},
							{
								targetTag: 'div',
								targetClass: 'augmentedText',
								targetText: '#' + result.number
							},
							...tags
						],
					},
					thing
				])
			}
		});
	})

	fetch('https://api.github.com/repos/reimakesgames/hybrid-conflict/pulls')
	.then((response) => response.json())
	.then((data) => {
		console.log(data)
		NewElement({
			targetParent: document.body,
			targetTag: 'div',
			targetClass: 'sectionTitles',
			targetText: 'Pull Requests'
		}, [])
		let issuesContainer = NewElement({
			targetParent: document.body,
			targetTag: 'div',
			targetClass: 'issuesContainer'
		}, [])
		let curr = 0
		data.forEach((result, index) => {
			let thing
			let tags = []
			if (result.body !== null) {
				thing = {
					targetTag: 'div',
					targetClass: 'issueContent',
					targetText: result.body
				}
			}
			if (result.labels.length >= 0) {
				result.labels.forEach((res, ind) => {
					tags.splice(tags.length - 1, 0, {
						targetTag: 'span',
						targetClass: 'tag',
						targetText: res.name,
						backgroundcolor: '#'+res.color
					})
				});
			}
			if (result.pull_request !== null) {
				let obj = NewElement({
					targetParent: issuesContainer,
					targetTag: 'div',
					targetClass: 'issueContainer',
					ad: curr * 0.05,
				}, [
					{
						targetTag: 'div',
						targetClass: 'wrapper',
						children: [
							{
								targetTag: 'img',
								targetClass: 'profile',
								backgroundimage: result.user.avatar_url,
							},
							{
								targetTag: 'a',
								targetClass: 'issueTitle',
								targetText: result.title,
								href: result.html_url,
								target: '_blank'
							},
							{
								targetTag: 'div',
								targetClass: 'augmentedText',
								targetText: '#' + result.number
							},
							...tags
						],
					},
					thing
				])
			}
		});
	})
}, 200)
