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
let bruh = NewElement({
	targetParent: document.body,
	targetTag: 'div',
	targetClass: 'column2',
}, [])
let bruh2 = NewElement({
	targetParent: bruh,
	targetTag: 'div',
	targetClass: 'column2',
}, [])
setTimeout(() => {
	let wrapperBranches = NewElement({
		targetParent: bruh,
		targetTag: 'div',
	}, [])
	NewElement({
		targetParent: wrapperBranches,
		targetTag: 'div',
		targetClass: 'sectionTitles',
		targetText: 'Branches'
	}, [])
	let branchesContainer = NewElement({
		targetParent: wrapperBranches,
		targetTag: 'span',
		targetClass: 'issuesContainer'
	}, [])
	fetch('https://api.github.com/repos/reimakesgames/hybrid-conflict/branches')
	.then((response) => response.json())
	.then((data) => {
		console.log(data)
		let curr = 0
		data.forEach((result, index) => {
			let protected = result.protected
			let prot
			let col
			if (protected) {
				prot = {
					targetTag: 'img',
					targetClass: 'profile',
					backgroundimage: "https://png.pngtree.com/element_our/20190528/ourmid/pngtree-black-and-white-shield-icon-image_1128462.jpg",
				}
			}
			if (result.name == "main") {
				col = "#3498db"
			} else if (result.name == "working") {
				col = "#e67e22"
			}
			NewElement({
				targetParent: branchesContainer,
				targetTag: 'div',
				targetClass: 'issueContainer',
				ad: curr * 0.01,
				backgroundcolor: col,
			}, [
				{
					targetTag: 'div',
					targetClass: 'wrapper',
					children: [
						prot,
						{
							targetTag: 'a',
							targetClass: 'issueTitle',
							targetText: result.name,
							href: "https://github.com/reimakesgames/hybrid-conflict/commits/" + result.name,
							target: '_blank'
						},
						{
							targetTag: 'div',
							targetClass: 'augmentedText',
							targetText: (result.commit.sha).substring(0, 7)
						}
					],
				}
			])
		})
		if (data.length === 0) {
			NewElement({
				targetParent: branchesContainer,
				targetTag: 'div',
				targetClass: 'issueContainer',
				ad: curr * 0.01,
			}, [
				{
					targetTag: 'div',
					targetClass: 'nothing',
					targetText: 'There are no branches somehow...',
				},
			])
		}
	})
	.catch(function(e) {
		NewElement({
			targetParent: branchesContainer,
			targetTag: 'div',
			targetClass: 'issueContainer',
		}, [
			{
				targetTag: 'div',
				targetClass: 'nothing',
				targetText: e
			},
		])
	})
	let wrapperIssues = NewElement({
		targetParent: bruh2,
		targetTag: 'div',
	}, [])
	NewElement({
		targetParent: wrapperIssues,
		targetTag: 'div',
		targetClass: 'sectionTitles',
		targetText: 'Issues'
	}, [])
	let IssuesContainer = NewElement({
		targetParent: wrapperIssues,
		targetTag: 'span',
		targetClass: 'issuesContainer'
	}, [])
	fetch('https://api.github.com/repos/reimakesgames/hybrid-conflict/issues')
	.then((response) => response.json())
	.then((data) => {
		console.log(data)
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
					targetParent: IssuesContainer,
					targetTag: 'div',
					targetClass: 'issueContainer',
					ad: curr * 0.01,
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
		if (data.length === 0) {
			NewElement({
				targetParent: IssuesContainer,
				targetTag: 'div',
				targetClass: 'issueContainer',
				ad: curr * 0.01,
			}, [
				{
					targetTag: 'div',
					targetClass: 'nothing',
					targetText: 'There are no active Issues',
				},
			])
		}
	})
	.catch(function(e) {
		NewElement({
			targetParent: IssuesContainer,
			targetTag: 'div',
			targetClass: 'issueContainer',
		}, [
			{
				targetTag: 'div',
				targetClass: 'nothing',
				targetText: e
			},
		])
	})

	let wrapperPulls = NewElement({
		targetParent: bruh2,
		targetTag: 'div',
	}, [])
	NewElement({
		targetParent: wrapperPulls,
		targetTag: 'div',
		targetClass: 'sectionTitles',
		targetText: 'Pull Requests'
	}, [])
	let PullsContainer = NewElement({
		targetParent: wrapperPulls,
		targetTag: 'span',
		targetClass: 'issuesContainer'
	}, [])
	fetch('https://api.github.com/repos/reimakesgames/hybrid-conflict/pulls')
	.then((response) => response.json())
	.then((data) => {
		console.log(data)
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
				curr = curr + 1
				let obj = NewElement({
					targetParent: PullsContainer,
					targetTag: 'div',
					targetClass: 'issueContainer',
					ad: curr * 0.01,
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
		if (data.length === 0) {
			NewElement({
				targetParent: PullsContainer,
				targetTag: 'div',
				targetClass: 'issueContainer',
				ad: curr * 0.01,
			}, [
				{
					targetTag: 'div',
					targetClass: 'nothing',
					targetText: 'There are no active Pull Requests'
				},
			])
		}
	})
	.catch(function(e) {
		NewElement({
			targetParent: PullsContainer,
			targetTag: 'div',
			targetClass: 'issueContainer',
			ad: 0,
		}, [
			{
				targetTag: 'div',
				targetClass: 'nothing',
				targetText: e
			},
		])
	})
}, 200)
