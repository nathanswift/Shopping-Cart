$(document).ready( function () {
    // Our code goes here... 
    // handles the select form
    displayClearButton();

   $('#plan').on('change', function() {
    var priceText;

    switch(this.value) {
        case 'monthly':
            priceText = '$10.00 /mo'
            break
        case 'quarterly':
            priceText = '$9.00 /mo'
            break
        case 'yearly':
            priceText = '$7.00 /mo'
            break
    }

    $('#price').text(priceText);
   })

   $('#add').on('click', function () {
       var plan = $('#plan');
       var installment = plan.val();
       var price = $('#price').text();
       var inCart = $('#in_cart');
       var numeric = price.replace(/[[A-Za-z$\/\s]/g, '');
       var data = 'data-price="' + numeric + '" data-plan="' + installment + '"';
       inCart.append('<li class="entry"' + data + '>' + installment + '-' + price + 
        '<button class="remove">X</button></li>');
       updateTotal();
   })

   function displayClearButton() {
    var entries = $('.entry');
       if (entries.length)
        $('#empty').show();
       else 
        $('#empty').hide();

   }

   function updateTotal () {
       var total = 0;

       
       displayClearButton();
       
       $('.entry').each(function (index, entry) {
           var data = $(entry).data();
           var price = parseFloat(data.price);
           var installment = data.plan;
           switch(installment) {
               case 'monthly':
               total += price;
               break;
               case 'quarterly':
               total += price * 4;
               break;
               case 'yearly':
               total += price * 12;
               break;
            }
        })
        if (total > 0)
         $('#purchase').show();
         else {
             $('#purchase').hide();
         }
        
        $('#total').text('$' + total);
   }


   // Since .remove is being dynamically rendered, we need to call this event on the document and pass 
   // the .remove class as the second argument to the .on function. 
   $(document).on('click', '.remove', function() {
       $(this).parents('li').remove();
       updateTotal();
   })

   $('#empty').on('click', function () {
       $('#in_cart').empty();
       updateTotal();
   })

   $('#display_cart').on('click', function() {
       var cart = $('#cart');
       var button = $(this);
       if (button.text() === "Hide Cart")
        button.text("Show Cart");
        else
        button.text("Hide Cart");

        cart.slideToggle('fast');
   })

   $('#purchase').on('click', function() {
       $('#complete')
        .html('<h2>Purchase Complete</h2>')
        .css({
            backgroundColor: '#bca',
            width: '25%',
            border: '1px solid green',
            textAlign: 'center',
            marginBottom: '25px'
        })
        .animate({
            width: '70%',
            opacity: 0.4,
            marginLeft: '0.6in',
            fontSize: '18px',
            borderWidth: '10px'
            
        }, 1500)
   })

});