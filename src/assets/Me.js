import $ from 'jquery'

( function() {
    var Me = function () {
        this.$body = $('body')
    }

    Me.prototype.initHidden = function(){
            $('.interest').hide();
            $('.client').hide();

            $('.timeline li').css('opacity',0)
            $('.progress-bar').css('width',0)
            $('.intro h2').css('opacity',0).animate( { opacity : 1}, 1000     )
            $('.intro h1').css('opacity',0).animate( { opacity : 1}, 1000     )
            $('section h1').css('opacity',0)
            $('.content').css('opacity',0)
            $('.logo .box').css('opacity',0)
        },

    Me.prototype.initClicks = function(){                 
            $(".nav-button").click(function() {
                var location = $(this).attr('data-location')
                $(".nav-button").removeClass('active')

                $(this).addClass('active')

                    $(".nav-button").each(function( ){
                        if($(this).hasClass('active')){
                              $(this).children('i').css({
                                'color': '#fff',
                                'border': '3px solid #000'
                            })

                        } else{
                             $(this).children('i').css({
                                'color': '#000',
                                'border': '3px solid #fff'
                            })
                        }
                    })

                $('html,body').animate({
                    scrollTop: $("."+location).offset().top},
                    'slow');
            });

            $(".nav-link").click(function() {
                var location = $(this).attr('data-location')
                $(".nav-button").removeClass('active')

               
                $('html,body').animate({
                    scrollTop: $("."+location).offset().top},
                    'slow');
            });
        }
    Me.prototype.init = function(){   
        this.initClicks()
        this.initHidden()
    }          

    $.Me = new Me()
    $.Me.Constructor = Me

})()