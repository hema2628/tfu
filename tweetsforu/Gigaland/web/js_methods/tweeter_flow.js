window.onload = function (){
    var afterUrl =  window.location.search.substring(1);
    var authorid = afterUrl.split("=")[1];

    apikey = 'Y88VHE98RE86VAU5IUEGAYTBHHC39YXY1B'
    apikey_alc = "l8sVYLAluoIt6ZhOvnyTerWmoO2n5J1h"


    tif_cards_field = document.getElementById("left-tweets")
    NFT_field = document.getElementById("right-nftinfo")
    nft_info_field = document.getElementById("ownednft")
    owned_tokens = document.getElementById("ownedtoken")
    transaction_rel = document.getElementById("transfer_rel")
    most_trans_ads = document.getElementById("most_rel_accounts")
    comment_form = document.getElementById("contact_form")
    form_submit = document.getElementById("send")




    comment_form.onsubmit = function (){
        submit_form(authorid)
        return false
    }



    set_unvisible()
    document.getElementById("show-nft-dtls").onclick = function (){
        set_unvisible();
        // nft_dtls.style.display = "block"
        $("#nft-dtls").show()
    }

    document.getElementById("show-trans-dtls").onclick = function (){
        set_unvisible();
        // transaction_dtls.style.display = "block"
        $("#transaction-dtls").show()
    }

    document.getElementById("show-token-dtls").onclick = function (){
        set_unvisible();
        $("#token-dtls").show()
    }

    document.getElementById("show-twt-followers").onclick = function (){
        set_unvisible();
        $("#twitter-followers").show()
    }


    var box = my$('box');
    var hidden = my$('hidden');
    var close = my$('close');
    var submit_f_comment = my$('login')

    close.onclick = function () {
        box.style.display = 'none';
        hidden.style.display = 'none';
        // 关闭后恢复box到原来的默认位置
        box.style.top = '200px';
        box.style.left = '';
    }
    box.onmousedown = function (e) {
        e = e || window.event;
        // 盒子的位置
        var x = getPage(e).pageX - box.offsetLeft;
        var y = getPage(e).pageY - box.offsetTop;
        document.onmousemove = function (e) {
            e = e || window.event;
            box.style.left = getPage(e).pageX - x + 'px';
            box.style.top = getPage(e).pageY - y + 'px';
        }
    }

    submit_f_comment.onclick = function (){
        var txt =  my$('f-comment-text').value;
        var commentor = "user2";
        eel.insert_f_comment(authorid,id,commentor,txt);
        my$('f-comment-text').value = "";
        close.click()

    }

    document.onmouseup = function () {
        document.onmousemove = null;
    }


    eel.tweet_getter_by_Id_withlimit(authorid,4)

    eel.show_comments(authorid)
}


eel.expose(create_tif_cards)
function create_tif_cards(list){
    author = list.author
    tweets_list = list.tweets
    tif_cards_field.innerHTML = "<h1>Recent tweets</h1>"


    for (var i = 0; i<tweets_list.length; i++) {
        var tweet_info = tweets_list[i]
        tif_cards_field.innerHTML+=tif_card(tweet_info)
    }


    create_NFT_card(author.address)
}

function tif_card(tweet_info){

    var date = new Date(tweet_info.created_at);
    img_url = ""
    link = ""
    if(tweet_info.entities.media){
        img_url = tweet_info.entities.media[0].media_url
        link = tweet_info.entities.media[0].url
    }else{
        img_url = "images/tweetsforu/default_twt.png"
        link = "https://twitter.com/"+tweet_info.user.screen_name+"/status/"+tweet_info.id_str
    }

    html = "<li class=\"tif_card\">\n" +
        "                        <div class=\"tif_card_content tif_card_text\">\n" +
        "                            <span class='text'>"+tweet_info.text_CN+"</span>\n" +
        "                            <p class='date'>"+date+"</p>\n" +
        "                        </div>\n" +
        "                        <img class=\"tif_card_content tif_card_profile\" src=\""+img_url+"\" alt=\"\">\n" +
        "                    </li>"

    return html
}

function create_NFT_card(address){
    // address = '0xc6b0562605D35eE710138402B878ffe6F2E23807'
    if(address !== ""){
        nft_info_field.innerHTML="<h1>NFT</h1>";
        nft_info_field.innerHTML+="<h3>Owned NFTs</h3>"
        getNFTInfos(address)
        get_recent_trans(address)
    }else{
        NFT_field.innerHTML="<h3>No NFT infomation found</h3>"
    }


}

async function getNFTInfos(address) {

    // Using HTTPS
    const web3 = AlchemyWeb3.createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/"+apikey_alc);

    const nfts = await web3.alchemy.getNfts({owner: address})

    NFT_list = nfts.ownedNfts


    if(NFT_list.length === 0){
        nft_info_field.innerHTML="<p>No owned NFT</p>"

    }else{
        var len = NFT_list.length>5?5:NFT_list.length
        for(var i = 0; i<len; i++){
            nft_info_field.innerHTML += "&nbsp;<a class=\"nft-token\">"+
                NFT_list[i].metadata.name+
                "</a>&nbsp;"

            document.getElementById("nft-dtls").getElementsByTagName("tbody")[0].innerHTML+=
                "<tr><td>"+NFT_list[i].metadata.name+"</td>\n" +
                "                            <td>"+NFT_list[i].metadata.description+"</td>\n" +
                "                            <td>"+NFT_list[i].timeLastUpdated+"</td></tr>"

        }



    }


    return nfts

}


function get_recent_trans(address){


    const Url = "https://api.etherscan.io/api?module=account&action=tokennfttx&address=" + address +
        "&page=1&offset=10&startblock=0&endblock=27025780&sort=asc&apikey=" + apikey

// Using ethers.js
    $.ajax({
        url: Url,
        type:"GET",
        success:function (result) {
            result = result.result

            for(var i=0; i<result.length; i++){
                transaction_rel.innerHTML += "&nbsp;<a class=\"nft-token\">"+result[i].tokenName+"</a>&nbsp;"
                tid = result[i].tokenID
                if(result[i].tokenID.length>10){
                    tid = result[i].tokenID.substring(0,10)+"..."
                }

                document.getElementById("transaction-dtls").getElementsByTagName("tbody")[0].innerHTML+="" +
                    "<tr>\n" +
                    "                            <td class=\"tid\">"+tid+"</td>\n" +
                    "                            <td>"+result[i].tokenName+"</td>\n" +
                    "                            <td>"+result[i].nonce+"</td>\n" +
                    "                            <td>"+result[i].blockNumber+"</td>\n" +
                    "                            <td>"+result[i].from+"</td>\n" +
                    "                            <td>"+result[i].to+"</td>\n" +
                    "                            <td>"+result[i].transactionIndex+"</td>\n" +
                    "                        </tr>"
                if(i<=3){
                    most_trans_ads.innerHTML += "&nbsp;<a class=\"nft-token\">"+result[i].from+"</a>&nbsp;"
                }


                getToken(result[i].contractAddress,result[i].tokenID)


                async function getToken(contractaddress,tokenid) {
                    // Using HTTPS
                    const web3 = AlchemyWeb3.createAlchemyWeb3("https://eth-mainnet.g.alchemy.com/v2/"+apikey_alc);

                    const metadata = await web3.alchemy.getTokenMetadata(contractaddress)

                    owned_tokens.innerHTML += "&nbsp;<a class=\"nft-token\">"+metadata.name+"</a>&nbsp;"


                    get_token_owners(contractaddress,tokenid)

                    function get_token_owners(contractaddress,tokenid){
                        const  url = "https://eth-mainnet.g.alchemy.com/v2/demo/getOwnersForToken?contractAddress="+contractaddress+"&tokenId="+tokenid
                        $.ajax({
                            url: url,
                            type:"GET",
                            success:function (result) {

                                document.getElementById("token-dtls").getElementsByTagName("tbody")[0].innerHTML +="" +
                                    "<tr>\n" +
                                    "                            <td>"+ metadata.name+"</td>\n" +
                                    "                            <td>"+metadata.symbol+"</td>\n" +
                                    "                            <td>"+result.owners.length+"</td>\n" +
                                    "                        </tr>"

                            },
                            error:function (error) {
                                console.log(error)

                            }

                        })
                    }
                }

            }


        },
        error:function (error) {
            console.log(error)

        }

    })
}

function set_unvisible(){
    $("#nft-dtls").hide()
    $("#token-dtls").hide()
    $("#transaction-dtls").hide()
    $("#twitter-followers").hide()
}

function submit_form(to){
    var input_value = document.getElementById("message").value
    eel.insert_comment(to,input_value)


    alert("Comment post successfully")
    document.getElementById("message").value = ""
}

eel.expose(display_comments)
function display_comments(list){


    comments_list = document.getElementById("comments_list")
    comment_html_str = ""

    for(var i=0; i<list.length; i++){

        f_comment_html_str = "";
        f_comments = list[i].following_comments
        console.log(f_comments)
        for (var j=0; j<f_comments.length; j++){
            f_comment_html_str+="<ol><li>\n" +
                "                        <div class=\"avatar\">\n" +
                "                            <img src=\"images/icon.png\" alt=\"\" /></div>\n" +
                "                        <div class=\"comment-info\">\n" +
                "                            <span class=\"c_name\">"+f_comments[j].commentor+"</span>\n" +
                "                            <span class=\"c_date id-color\">"+f_comments[j].time+"</span>\n" +
                                "\n" +
                "                            <div class=\"clearfix\"></div>\n" +
                "                        </div>\n" +
                "                        <div class=\"comment\">"+f_comments[j].msg+"</div>\n" +
                "                    </li></ol>"
        }

        comment_html_str+="<li>\n" +
            "                        <div class=\"avatar\">\n" +
            "                            <img src=\"images/icon.png\" alt=\"\" /></div>\n" +
            "                        <div class=\"comment-info\">\n" +
            "                            <span class=\"c_name\">"+list[i].commentor+"</span>\n" +
            "                            <span class=\"c_date id-color\">"+list[i].time+"</span>\n" +
            "                           <span class=\"c_reply\"><a class=\"open\" href=\"javascript:void(0)\" name='"+list[i].to+","+list[i].ID+"' onclick='opencomment(this.name)'>Reply</a></span>"+
            "\n" +
            "                            <div class=\"clearfix\"></div>\n" +
            "                        </div>\n" +
            "                        <div class=\"comment\">"+list[i].message+"</div>\n" +
            f_comment_html_str+
            "                    </li>"
    }

    comments_list.innerHTML = comment_html_str


}

eel.expose(getCommentItem)
function getCommentItem(item){
    console.log(item)
    return item
}


function opencomment(namestring) {
    holder = namestring.split(",")[0]
    id = namestring.split(",")[1]
    eel.getCommentItem(holder,id)
    box.style.display = 'flex';
    hidden.style.display = 'block';
}

function my$(id) {
    return document.getElementById(id);
}

// 获取鼠标在页面的位置，处理浏览器兼容性
function getPage(e) {
    var pageX = e.pageX || e.clientX + getScroll().scrollLeft;
    var pageY = e.pageY || e.clientY + getScroll().scrollTop;
    return {
        pageX: pageX,
        pageY: pageY
    }
}