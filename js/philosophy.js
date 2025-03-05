$(document).ready(function(){
    const currentUrl = window.location.href;
    if (currentUrl.includes('detail') || 
    currentUrl.includes('account')|| 
    currentUrl.includes('checkout') || 
    currentUrl.includes('ordersMyOrders')|| 
    currentUrl.includes('ordersWishList')|| 
    currentUrl.includes('ordersCart')|| 
    currentUrl.includes('support')|| 
    currentUrl.includes('listAboutUs')|| 
    currentUrl.includes('listHopeGrace')|| 
    currentUrl.includes('listOurPurpose')|| 
    currentUrl.includes('listLoyaltyProgram')
) {
    $('header').addClass('headerWh');
}

    cartEmpty();
    permissionCut();
    faqScroll();
    toggleUI(".heartBtn");
    toggleUI("#listFilterPanel form ul li b");
    toggleUI(".addressContainer article ul > li:not(:last-of-type) > button:nth-child(1)");
    mainTabSlider();
    slider(".cartBoxSlider",2,3,195,10,0,false,true);
    slider(".bestSellersSlider",1,4,360,10,1,false,true);
    slider(".recommendSlider",2,4,400,30,4,false,true) ;
    slider(".detailSlider",1,1,665,0,0,true,true);
    slider(".detailTopReviewsSlider",1,2,390,10,0,false,true);
    slider(".ourPurposeBoxSlider",1,2,1160,0,1,true,true);
    rollingList("main > div:nth-child(2)","main > div:nth-child(2) .rollingList");
    rollingList("header > div:nth-child(1)","header > div:nth-child(1) > .rollingList");
    panelControl("button[data-panel='cartPanel']","#cartPanel h2 button.closeBtn");
    panelControl("input[data-panel='cartPanel']","#cartPanel h2 button.closeBtn");
    panelControl("button[data-panel='cartTrashPopup']","#cartTrashPopup input.closeBtn");
    panelControl("header button[data-panel='searchPopup']","#searchPopup h2 button.closeBtn");
    panelControl(".listContainer > input[value='FILTER & SORT']",".listContainer aside button.closeBtn");
    panelControl(".detailContainer > div:nth-of-type(3) > input[type='button']","#writePopup > button.closeBtn");
    panelControl(".addressContainer article ul > li:not(:last-of-type) > button:nth-child(2)","#editAddPopup .closeBtn");
    panelControl(".addressContainer article ul > li:last-child","#newAddPopup > button.closeBtn");
    panelControl("button[data-popup='comfirmPopup']","#comfirmPopup .closeBtn");
    panelControl("input[data-popup='comfirmPopup']","#comfirmPopup .closeBtn");
    panelControl(".orderContainer article input[value='Shipment']","#shipmentPopup .closeBtn");
    panelControl(".orderContainer article input[value='Order Detail']","#orderDetailPopup .closeBtn");
    panelControl(".orderContainer article input[value='Return Request']","#returnPopup .closeBtn");
    panelControl(".orderContainer article input[value='Review']","#reviewPopup .closeBtn");
    panelControl(".checkoutContainer .addRadio  input[type='button']","#addListPopup .closeBtn");
    panelControl("header > div:nth-child(2) > button","#hamburgerPanel .closeBtn");
    tabControl(".newNavi button","main section div .bx-wrapper .productsBoxSlider");
    navScroll();
    accordion(".accComponent h3","block");
    accordion("header > div:nth-child(2) nav ul li u","block");
    accordion("footer > ul > li > h3","block");
    accordion(".checkoutContainer aside h2","flex");
    accordion("div > aside > h2","block");
    controlProgress("li div progress", "img[data-progress='imgTimer']");
    countControl();
    helpfulControl();
    profileEdit(".profileContainer article ul li input[value='EDIT'],.profileContainer article ul li input[type='text'],.profileContainer article ul li input[type='password']");
    deleteControl(".xi-trash","#comfirmPopup input[value='DELETE']");
    deleteControl("input[type='checkbox']:checked","#comfirmPopup input[value='DELETE']");
    onlyNumber();
    togglePaymentInfo();

});
function cartEmpty() {
    $("#cartTrashPopup input[value='yes']").on("click", function () {
        $("#cartPanel > form > ul > li").addClass("hidden");
        $("#cartPanel > form > p").addClass("active");
        $("#cartTrashPopup").remove();
    });
}
function permissionCut(){
    var isLoggedIn = false;
    $(".beforeIndex a").click(function(event) {
        if ($(this).closest("#loginPopup").length > 0) {
            return; 
        }

        if (!isLoggedIn) {
            event.preventDefault();
            $("#loginPopup").addClass("active");
        }
    });
    $("#loginPopup button.closeBtn").click(function() {
        $("#loginPopup").removeClass("active");
    });
}

function faqScroll() {
    $(".faqsContainer > article > dl dd a").on("click", function (event) {
        event.preventDefault();

        var targetId = $(this).attr("href");
        var targetElement = $(targetId);

        if (targetElement.length) {
            var navHeight = $("header").outerHeight() || 0; 
            var scrollOffset = 20;
            var targetPosition = targetElement.offset().top - navHeight - scrollOffset;

            $("html, body").animate(
                { scrollTop: targetPosition }, 
                500
            );
        }
    });
};



function onlyNumber() {
    $(".numberInput").on("input", function () {
      $(this).val($(this).val().replace(/[^0-9]/g, ""));
    });
}

function togglePaymentInfo() {
    if ($("#pay_radio2").is(":checked")) {
        $(".checkoutContainer form div fieldset:nth-of-type(2) .addInpo").hide();
    } else {
        $(".checkoutContainer form div fieldset:nth-of-type(2) .addInpo").show();
    }

    $("input[name='pay_radio']").on("change", togglePaymentInfo);
    togglePaymentInfo();
}


function deleteControl(trashBtn, deleteBtn) {
    let targetBox = null;

    $(trashBtn).on("click", function () {
        targetBox = $(this).closest("li"); 
    });

    $(deleteBtn).on("click", function () {
        if (targetBox) {
            targetBox.remove();
            targetBox = null;
        }
        $("input[type='checkbox']:checked").each(function () {
            $(this).closest("li").remove();
        });
    });
}

function slider(target,minSlidesVal,maxSlidesVal,slideWidthVal,slideMarginVal,moveSlidesVal,pagerBool,controlsBool){
    $(target).bxSlider({
        minSlides: minSlidesVal,
        maxSlides: maxSlidesVal,
        slideWidth: slideWidthVal,
        slideMargin: slideMarginVal,
        moveSlides: moveSlidesVal,
        pager: pagerBool,
        controls: controlsBool,
        touchEnabled: false
    });
}

function profileEdit(editBtn,textInput,passwordInput){
    $(editBtn,textInput,passwordInput).on("click", function () {
        let parentDiv = $(this).closest("div"); 
        let inputField = parentDiv.find("input[type='text'], input[type='password']"); 


        if (!inputField.data("original")) {
            inputField.data("original", inputField.val());
        }

        parentDiv.addClass("active"); 
        inputField.prop("readonly", false); 
    });


    $("input[value='SAVE']").on("click", function () {
        let parentDiv = $(this).closest("div");
        let inputField = parentDiv.find("input[type='text'], input[type='password']");
        let smallTag = parentDiv.find("small"); 

        if (inputField.val().trim() === "") {
            smallTag.addClass("active"); 
        } else {
            smallTag.removeClass("active"); 
            inputField.prop("readonly", true); 
            parentDiv.removeClass("active"); 
        }
    });

 
    $("input[value='CANCEL']").on("click", function () {
        let parentDiv = $(this).closest("div");
        let inputField = parentDiv.find("input[type='text'], input[type='password']");
        let smallTag = parentDiv.find("small");

        inputField.val(inputField.data("original")); 
        inputField.prop("readonly", true); 
        parentDiv.removeClass("active"); 

        
        if (inputField.val().trim() === "") {
            smallTag.addClass("active");
        } else {
            smallTag.removeClass("active");
        }
    });
}

function countControl(){
    $(".countUp").click(function () {
        let countElement = $(this).siblings("span");
        let currentCount = parseInt(countElement.text(), 10); 
        countElement.text(currentCount + 1);
    });

    $(".countDown").click(function () {
        let countElement = $(this).siblings("span"); 
        let currentCount = parseInt(countElement.text(), 10); 

        if (currentCount > 1) {
            countElement.text(currentCount - 1); 
        }
    });
}

function helpfulControl(){
    let selectBtn = {}; 
    $("input[name^='helpful']").on("click", function () {
        let groupName = this.name; 
        let currentLabel = $(`label[for="${this.id}"] span`);

        if (selectBtn[groupName] === this) return;

        let currentText = currentLabel.text(); 
        let trimmedText = currentText.slice(1, -1); 
        let currentValue = parseInt(trimmedText, 10);

        if (selectBtn[groupName]) {
            let previousLabel = $(`label[for="${selectBtn[groupName].id}"] span`);
            let previousValue = parseInt(previousLabel.text().slice(1, -1), 10);
            previousLabel.text(`(${--previousValue})`); 
        }

        currentLabel.text(`(${++currentValue})`); 

        selectBtn[groupName] = this;
    });
}


function navScroll(){
    $(window).scroll(function(){
        let firstSectionTop = $('section:first').offset().top;
        if($(window).scrollTop() >= firstSectionTop){
            $('header').addClass('headerWh ');
        }else if($(window).scrollTop() <= firstSectionTop){
            $('header').removeClass('headerWh ');
        }
    })
}


function toggleUI(btn){
    $(btn).click(function(){
        $(this).toggleClass("active");
    });
}


function rollingList(wrap, list) {
    const wrapElement = document.querySelector(wrap);
    const listElement = document.querySelector(list);
  
    if (!wrapElement) return; 
    if (!listElement) return; 
    listElement.classList.add("original");
    const clone = listElement.cloneNode(true);
    clone.classList.add("clone");
    wrapElement.appendChild(clone); 
}
  

function panelControl(btn,closeBtn){
    var currentPanel = null;
    $(btn).click(function(){
        currentPanel = "#" + ($(this).attr("data-panel") || $(this).attr("data-popup"));
        $(currentPanel).addClass("active");
    });
    $(closeBtn).click(function(){
        $(currentPanel).removeClass("active");
    });
}

function tabControl(btn,tabPage){
    var currentTabName = null;
    $(btn).click(function(){
        if(btn == '.newNavi button'){
            currentTabName = "#" + $(this).attr('data-tab');
        }
        $(btn).removeClass('active');
        $(this).addClass('active');
        $(tabPage).removeClass('active');
        $(currentTabName).addClass('active');
    });
}

function accordion(headerSelector, displayType = 'block') {
    $(headerSelector).click(function() {
        const content = $(this).next(); 

        if ($(this).hasClass('active')) {
            $(this).removeClass('active'); 
            content.slideUp(300, function() {
                $(this).css('display', 'none'); 
            });
        } else {
            
            $(headerSelector).removeClass('active');
            $(headerSelector).next().slideUp(300, function() {
                $(this).css('display', 'none'); 
            });

            
            $(this).addClass('active');

            
            content.css('display', displayType).hide().slideDown(300);
        }
    });
}

function controlProgress(progressSelector, imgSelector) {
    
    if ($(progressSelector).length === 0 || $(imgSelector).length === 0) {
        console.warn("controlProgress: Required elements not found. Function not executed.");
        return;
    }

    try {
        
        const progressBar = $(progressSelector);
        const img = $(imgSelector);

        
        let progressValue = 0;
        const progressIncreaseTime = 20; 
        let imageMaxReached = false; 

        function updateProgress() {
            if (imageMaxReached) {
                clearInterval(progressTimer);
                progressBar.val(100);
                return;
            }

            progressValue += 1;
            progressBar.val(progressValue);

            if (progressValue >= 100) {
                clearInterval(progressTimer);
                updateImage();
            }
        }

        function updateImage() {
            let currentSrc = img.attr("src");
            let newSrc = currentSrc.replace(/(\d+)(?=\.\w+$)/, function (match) {
                let imageNumber = parseInt(match, 10);

                if (imageNumber >= 3) {
                    imageMaxReached = true;
                    return "03";
                }

                imageNumber += 1;
                return imageNumber.toString().padStart(2, "0");
            });

            img.attr("src", newSrc);

            if (imageMaxReached) {
                progressBar.val(100);
                return;
            }

            restartProgress();
        }

   
        function restartProgress() {
            progressValue = 0;
            progressBar.val(progressValue);
            setTimeout(startProgress, 500);
        }

        function startProgress() {
            progressTimer = setInterval(updateProgress, progressIncreaseTime);
        }

      
        let progressTimer = setInterval(updateProgress, progressIncreaseTime);
    } catch (error) {
        console.error("Error in controlProgress:", error);
    }
}

function mainTabSlider(){
    var skinCareSlider = $("#skinCareSlider").bxSlider({
        maxSlides: 4,
        minSlides: 1,
        slideWidth: 360,
        slideMargin: 10,
        moveSlides: 1,
        wrapperClass : "skinCareSlider",
        pager: false,
        controls: true,
        touchEnabled: false
    });
    var bathBodySlider = $("#bathBodySlider").bxSlider({
        maxSlides: 4,
        minSlides: 1,
        slideWidth: 360,
        slideMargin: 10,
        moveSlides: 1,
        wrapperClass: "bathBodySlider",
        pager: false,
        controls: true,
        touchEnabled: false
    });
    var fragranceSlider = $("#fragranceSlider").bxSlider({
        maxSlides: 4,
        minSlides: 1,
        slideWidth: 360,
        slideMargin: 10,
        moveSlides: 1,
        wrapperClass: "fragranceSlider",
        pager: false,
        controls: true,
        touchEnabled: false
    });

    var tabButton = $(".newNavi button");
    var currentTab = '';
    var tabContent = $(".tabSlider > div");
    var currentSlider = '';
    $("button[data-name='skinCare']").addClass("active");
    
    tabButton.click(function(){
        tabContent.removeClass("active");
        currentTab = "." + $(this).attr("data-name") + "Tab";
        $(currentTab).addClass("active");

        tabButton.removeClass("active");
        $(this).addClass("active");

        currentSlider =  $(this).attr("data-name")+"Slider";
        if(currentSlider == "skinCareSlider"){
            skinCareSlider.reloadSlider();
        }else if(currentSlider == "bathBodySlider"){
            bathBodySlider.reloadSlider();
        }else if(currentSlider == "fragranceSlider"){
            fragranceSlider.reloadSlider();
        }
    });
}