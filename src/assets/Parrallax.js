import $ from 'jquery'

( function() {
    var Parallax = function () {
        this.$body = $('body')
    }

    Parallax.prototype.init = function(){
        function onScreen(element){
            var docViewTop = $(window).scrollTop();
            var docViewBottom = docViewTop + $(window).height();
    
            var elemTop = element.offset().top;
            var elemBottom = elemTop + element.height();
    
            return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop)); 
            }
    
        function sideNavActive(location_name){
    
             $(".nav-button[data-location='"+location_name+"'] ").children('i').css({
                        'color': '#fff',
                        'border': '3px solid #000'
                    })
        }

        $(window).scroll(function(){
            var wScroll =  $(this).scrollTop()
            var wHeight = $(window).height()
            var wMidHeight = wHeight / 1.2
       
            /*
                Navigation Section
            */
            if( wScroll - $('.header').offset().top > 0){
                $('.top-nav').css("position","fixed")
                 $('.logo .box').css('opacity',1)
            }
            if(   wScroll - $('.header').offset().top < 0){
            $('.top-nav').removeAttr('style')
               $('.logo .box').css('opacity',0)
            }
            
             $(".nav-button").each(function( ){
                $(this).children('i').css({
                    'color': '#000',
                    'border': '3px solid #fff'
                })
            })
            /*
                Clients Section
            */
            if( onScreen($('.clients'))){
                $('.client').each(function(i){
                    $(this).delay(250 * i ).fadeIn(700);
                })
                sideNavActive("clients")
            } 
            /*
                Interest Section
            */
            if( onScreen($('.me-body'))){
                $('.interest').each(function(i){
                    $(this).delay(150 * i ).fadeIn(700);
                })
                sideNavActive("about-me")
            } 
            /*
                Progress Bar Section
            */

            if( onScreen($('.progress-bar'))){
                 sideNavActive("skill") 
            }
            $('.progress-bar').each(function( ){
                if( wScroll -  ($(this).offset().top - wMidHeight) > 0 ){
                    $(this).css('width',  $(this).attr('aria-valuenow')+'%')
                }
            })
            /*
                Timeline Section
            */

            if( onScreen($('.timeline li.inverse')) || onScreen($('.timeline li.end')) || onScreen($('.timeline li.line')) ){  
                 sideNavActive("education") 
            }

            $('.timeline li').each(function( ){
                if(  wScroll - ( $(this).offset().top - wMidHeight ) > 0  ){
                    $(this).animate({opacity:1}, 1000); 
                        
                }
            })
           
            if( onScreen($('.contact'))){  
                 sideNavActive("contact") 
            }

            if( onScreen($('.portfolio'))){  
                 sideNavActive("portfolio") 
            }

            /*
                Icon Headers
            */

            $('.icon-header').each(function( ){
                if(  wScroll - ( $(this).offset().top - wMidHeight ) > 0  ){
                    $(this).animate({fontSize: '30px'}, 700); 
                        
                }
            })

            /*
                Headers
            */
            $('section h1').each(function( ){
                 if(  wScroll - ( $(this).offset().top - wMidHeight ) > 0  ){
                    $(this).animate({opacity: 1}, 700); 
                        
                }
            })
            /*
                Contents
            */
             $('.content').each(function( ){
                 if(  wScroll - ( $(this).offset().top - wMidHeight ) > 0  ){
                    $(this).animate({opacity: 1}, 700); 
                        
                    }
                })
           })
    }

    $.Parallax = new Parallax()
    $.Parallax.Constructor = Parallax

})()