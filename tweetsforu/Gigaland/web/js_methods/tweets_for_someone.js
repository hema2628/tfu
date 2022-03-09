window.onload = function (){

    var afterUrl =  window.location.search.substring(1);
    var authorid = afterUrl.split("=")[1]


    tweets_field = document.getElementById("tweets")

    eel.tweet_getter_by_Id(authorid)

}

eel.expose(creat_tweet_list)
function creat_tweet_list(data){
    // var tweetsOBJ = data.split(/\r?\n|\r/).slice(1,);
    console.log(data)
    var tweetsOBJ = data["tweets"]
    var authorOBJ = data["author"]
    var author_twt_page ="https://twitter.com/"+authorOBJ.screen_name

    author_name = authorOBJ.screen_name
    author_des = authorOBJ.description;

    tweets = ""
    // tweets += "       <div class=\"tweeter_info\">" +
    //     "       <img class=\"author_pil\" src=\""+authorOBJ.profile_image_url+"\" alt=\"Card image\">\n" +
    //     "       <p class=\"author_name\"><a href=\""+author_twt_page+"\">"+author_name+"</a></p>\n" +
    //     "       <p class=\"author_des\">"+author_des+"</p></div>";


    for (var i = 0; i<tweetsOBJ.length; i++){

        tweets += creat_tweet_box(tweetsOBJ[i],);
    }


    tweets_field.innerHTML = tweets;


}


function creat_tweet_box(tweet_info){
    var date = new Date(tweet_info.created_at);
    img_url = ""
    link = ""
    if(tweet_info.entities.media){
        console.log(tweet_info.entities.media)
        img_url = tweet_info.entities.media[0].media_url
        link = tweet_info.entities.media[0].url
    }else{
        img_url = "images/tweetsforu/default_twt.png"
        link = "https://twitter.com/"+tweet_info.user.screen_name+"/status/"+tweet_info.id_str
    }
    profit = "profit"
    loss = "loss"
    tweeter_name = tweet_info.user.screen_name
    tweet_id = tweet_info.id_str
    info_list = [tweeter_name,tweet_id.toString()]



    bottom_bar = "<div class=\"box_bottom_bar\">\n" +
        "        <div class=\"icons\">\n" +
        "            <a href=\"javascript:void(0)\" title='"+tweet_id+","+tweeter_name+","+profit+"' onclick=\"eel.update_profit_loss(this.title)\">\n" +
        "                <i class=\"fa fa-hand-o-up\" title=\"利好\" style=\"font-size:24px\"></i>\n" +
        "            </a>"+tweet_info.profit+"\n" +
        "        </div>\n" +
        "        \n" +
        "        <div class=\"icons\">\n" +
        "            <a href=\"javascript:void(0)\" title='"+tweet_id+","+tweeter_name+","+loss+"' onclick=\"eel.update_profit_loss(this.title)\">\n" +
        "                <i class=\"fa fa-hand-o-down\" title=\"利空\" style=\"font-size:24px\"></i>\n" +
        "            </a>"+tweet_info.loss+"\n" +
        "        </div>\n" +
        "\n" +
        "        <div class=\"icons\">\n" +
        "            <a href=\"javascript:void(0)\" onclick=\"\">\n" +
        "                <i class=\"fa fa-external-link\" title=\"转发分享\" style=\"font-size:24px\"></i>\n" +
        "            </a>分享\n" +
        "        </div>\n" +
        "\n" +
        "\n" +
        "    </div>"

    twt_text = tweet_info.text_CN
    if(tweet_info.text_CN.length === 0){
        twt_text = tweet_info.text
    }


    tweet_box = "\t\t\t\t\t\t<div class=\"col-lg-4 col-md-6 mb30\">\n" +
        "                    \t\t\t\t\t\t\t<div class=\"bloglist item\">\n" +
        "                                                        <div class=\"post-content\">\n" +
        "                                                            <div class=\"post-image\">\n" +
        "                                                                <img alt=\"\" src=\""+img_url+"\" class=\"lazy\">\n" +
        "                                                            </div>\n" +
        "                                                            <div class=\"post-text\">\n"+
        "                                                                <span class=\"p-date\">"+date+"</span>\n" +
        "                                                                <p>"+twt_text+"</p>\n" +
        "                                                                <a class=\"btn-main\" href=\""+link+"\">twitter</a>\n" +
                                                                            bottom_bar+
        "                                                            </div>\n" +
        "                                                        </div>\n" +
        "                                                    </div>\n" +
        "                    \t\t\t\t\t\t</div>"



    return tweet_box
}