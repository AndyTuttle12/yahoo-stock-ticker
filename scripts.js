
$(document).ready(function(){

	// var deletedDups = deleteDuplicateKeypairs();
	// localStorage.setItem("userStocks", deletedDups);
	// console.log(deletedDups);


	$('#arrow1').click(function(){
		$('#page-1, #page-2').animate({
			'right': '100vw'
		},100);
	});

	$('#arrow2').click(function(){
		$('#page-1, #page-2').animate({
			'right': '0vw'
		},100);
	});

	// If user has any stored stocks. load them.
	var userStocksSaved = localStorage.getItem('userStocks');
	
	var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20("'+userStocksSaved+'")%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json';
	pullStocks(url);
	
	$('.yahoo-form').submit(function(){
		event.preventDefault();
		var symbol = $('#symbol').val();
		// console.log(symbol);
		var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20("'+symbol+'")%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json';
		// console.log(url);
		pullStocks(url);
		
	});

	$('#save-btn').click(function(){
		var userStocksSaved = localStorage.getItem("userStocks");
		var symbol = $('#symbol').val();
		if(userStocksSaved !== null){
			localStorage.setItem("userStocks", symbol + ", " + userStocksSaved);
		}else{
			localStorage.setItem("userStocks", symbol);
		}
		
	});

	$('#clean-btn').click(function(){
		$('#stock-body').html('');
	});

	$('#clear-btn').click(function(){
		localStorage.removeItem("userStocks");
	});
});

function buildStockRow(stock){
	if(stock.Change.indexOf('+') > -1){
		var classChange = "success";
	}else{
		var classChange = "danger";
	}
	var newHTML = '';
	newHTML += '<tr>';
		newHTML += '<td><button class="save-btn btn-success">+</button></td>';
		newHTML += '<td>'+stock.Symbol+'</td>';
		newHTML += '<td>'+stock.Name+'</td>';
		newHTML += '<td>'+stock.Ask+'</td>';
		newHTML += '<td>'+stock.Bid+'</td>';
		newHTML += '<td class="'+classChange+'">'+stock.Change+'</td>';
	newHTML += '</tr>';
	return newHTML;
	// $('#stock-body').append(newHTML);
	// console.log(newHTML);
}

function pullStocks(url){
	$.getJSON(url, function(data){
		var stockInfo = data.query.results.quote;
		if(data.query.count == 1){
			var htmlToPlot = buildStockRow(stockInfo);
			$('#stock-body').append(htmlToPlot);
		}else{
			for(let i = 0; i < stockInfo.length; i++){
				var htmlToPlot = buildStockRow(stockInfo[i]);
				$('#stock-body').append(htmlToPlot);
			}
		}			
	});
};
// deleteDuplicateKeypairs();
// function deleteDuplicateKeypairs(userStocksSaved){
// 	var userStocksSaved2 = userStocksSaved.split(",");
// 	var userStocksSavedFinal = userStocksSaved2;
// 	for(let b = 0; b < userStocksSaved2.length; b++){
// 		for(let c = 0; c < userStocksSaved2.length; c++){
// 			if((userStocksSaved2[b] == userStocksSaved2[c])&&(c!=b)){
// 				userStocksSavedFinal.splice(c,1);
// 			}
// 		}
// 	}
// 	console.log(userStocksSavedFinal);
// 	return userStocksSavedFinal;

// }
