let tableBody = $('#tableBody');
function getData(){
    //get all pair prices from binance api
    $.ajax({
        url: 'https://api.binance.com/api/v1/ticker/24hr',
        type: 'GET',
        dataType: 'json',
        success: function(data){
            render(data)
        } 
    });

}

setInterval(function(){
    console.log(pairList);
    getData(pairList);
},5000);
function cleanFloat(num){
    let sides = num.toString().split('.');
    let left = sides[0];
    let right = sides[1];
    right.replaceAll('0','');
    let newNum = left + '.' + right;
    return newNum;
}
function render(data){
    let html = "";
    data.forEach(function(pair){
                let symbol = pair.symbol;
                let price = pair.lastPrice;
                let leftright = parseFloat(price).toString().split('.');
                let left = leftright[0];
                let right = leftright[1];
                let digitNo= right.length;
                let stringofDigits = '0.';
                for(let i = 0; i < digitNo-1; i++){
                    stringofDigits += '0';
                }
                stringofDigits += '1';

                if(right.length=null){
                    stringofDigits=1
                }
                let ppbp = ( parseFloat(price)-parseFloat(stringofDigits) )/parseFloat(stringofDigits);
                html += '<tr><td>'+symbol+'</td><td>'+price+'</td><td>'+stringofDigits+'</td><td>'+parseInt(ppbp)+'</td></tr>';
                
                console.log(ppbp)
});
$('#tableBodyID').html(html);
    
};