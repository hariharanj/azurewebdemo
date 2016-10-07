function directedit() {
	if(document.getElementById("de") != null) {
		var link = document.getElementById("de").parentNode.innerHTML;
		document.getElementById("de").parentNode.innerHTML = null;
		document.getElementById("directedit").innerHTML = link;
	}
}
