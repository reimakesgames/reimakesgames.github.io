function NewElement(props, children) {
	let element = document.createElement(props.targetTag)
	element.textContent = props.targetText
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
	props.targetParent.appendChild(element)
	if (children !== undefined || children !== null) {
		if (children.length > 0) {
			children.forEach((childProps, index) => {
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
	data.forEach((result, index) => {
		let thing
		if (result.body !== null) {
			thing = {
				targetTag: 'div',
				targetClass: 'issueContent',
				targetText: result.body
			}
		}
		if (!result.pull_request) {
			let obj = NewElement({
				targetParent: issuesContainer,
				targetTag: 'div',
				targetClass: 'issueContainer',
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
						}
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
	data.forEach((result, index) => {
		let thing
		if (result.body !== null) {
			thing = {
				targetTag: 'div',
				targetClass: 'issueContent',
				targetText: result.body
			}
		}
		if (result.pull_request !== null) {
			console.log(result.user.avatar_url)
			let obj = NewElement({
				targetParent: issuesContainer,
				targetTag: 'div',
				targetClass: 'issueContainer',
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
						}
					],
				},
				thing
			])
		}
	});
})
