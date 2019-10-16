// TODO: 用户名称需修改为自己的名称
var userName = 'Lu仔酱';
// 朋友圈页面的数据
var data = [{
  user: {
    name: '阳和', 
    avatar: './img/avatar2.png'
  }, 
  content: {
    type: 0, // 多图片消息
    text: '华仔真棒，新的一年继续努力！',
    pics: ['./img/reward1.png', './img/reward2.png', './img/reward3.png', './img/reward4.png'],
    share: {},
    timeString: '3分钟前'
  }, 
  reply: {
    hasLiked: false,
    likes: ['Guo封面', '源小神'],
    comments: [{
      author: 'Guo封面',
      text: '你也喜欢华仔哈！！！'
    },{
      author: '喵仔zsy',
      text: '华仔实至名归哈'
    }]
  }
}, {
  user: {
    name: '伟科大人',
    avatar: './img/avatar3.png'
  },
  content: {
    type: 1, // 分享消息
    text: '全面读书日',
    pics: [],
    share: {
      pic: 'http://coding.imweb.io/img/p3/transition-hover.jpg',
      text: '飘洋过海来看你'
    },
    timeString: '50分钟前'
  },
  reply: {
    hasLiked: false,
    likes: ['事实'],
    comments: [{
      author: 'f',
      text: '哈！！！'
    }]
  }
}, {
  user: {
    name: '深圳周润发',
    avatar: './img/avatar4.png'
  },
  content: {
    type: 2, // 单图片消息
    text: '很好的色彩',
    pics: ['http://coding.imweb.io/img/default/k-2.jpg'],
    share: {},
    timeString: '一小时前'
  },
  reply: {
    hasLiked: false,
    likes:['asd'],
    comments: [{
      author: 'Gf',
      text: '哈！！！'
    }]
  }
}, {
  user: {
    name: '喵仔zsy',
    avatar: './img/avatar5.png'
  },
  content: {
    type: 3, // 无图片消息
    text: '以后咖啡豆不敢浪费了',
    pics: [],
    share: {},
    timeString: '2个小时前'
  }, 
  reply: {
    hasLiked: false,
    likes:['回家'],
    comments: [{
      author: '面',
      text: '安师大！！'
    }]
  }
}];

// 相关 DOM
var $page = $('.page-moments');
var $momentsList = $('.moments-list');
var $body = $('body');
var replyComment1;

$pageMoments = $('.page-moments'); 
$functioonList = $('.function-list');
$LikeText = $functioonList.find('.function-like');
$pageInput = $('.page-input');  						//输入框区域
$pageInputArea = $('.page-input input');		//输入框
$releaseBtn = $('#release-btn');         	//输入按钮
$overLay = $('.overLay');                	//蒙版


/**
 * 点赞内容 HTML 模板
 * @param {Array} likes 点赞人列表
 * @return {String} 返回html字符串
 */
function likesHtmlTpl(likes) {
  if (!likes.length) {
    return '';
  }
  var  htmlText = ['<div class="reply-like"><i class="icon-like-blue"></i>'];
  // 点赞人的html列表
  var likesHtmlArr = [];
  // 遍历生成
  for(var i = 0, len = likes.length; i < len; i++) {
    likesHtmlArr.push('<a class="reply-who" href="#">' + likes[i] + '</a>');
  }
  // 每个点赞人以逗号加一个空格来相隔
  var likesHtmlText = likesHtmlArr.join(', ');
  htmlText.push(likesHtmlText);
  htmlText.push('</div>');
  return htmlText.join('');
}
/**
 * 评论内容 HTML 模板
 * @param {Array} likes 点赞人列表
 * @return {String} 返回html字符串
 */
function commentsHtmlTpl(comments) {
  if (!comments.length) {
    return '';
  }
  var  htmlText = ['<div class="reply-comment">'];
  for(var i = 0, len = comments.length; i < len; i++) {
    var comment = comments[i];
    htmlText.push('<div class="comment-item"><a class="reply-who" href="#">' + comment.author + '</a>：' + comment.text + '</div>');
  }
  htmlText.push('</div>');
  return htmlText.join('');
}
/**
 * 评论点赞总体内容 HTML 模板
 * @param {Object} replyData 消息的评论点赞数据
 * @return {String} 返回html字符串
 */
function replyTpl(replyData) {
  var htmlText = [];
  htmlText.push('<div class="reply-zone">');
  htmlText.push(likesHtmlTpl(replyData.likes));
  htmlText.push(commentsHtmlTpl(replyData.comments));
  htmlText.push('</div>');
  return htmlText.join('');
}
/**
 * 多张图片消息模版 （可参考message.html）
 * @param {Object} pics 多图片消息的图片列表
 * @return {String} 返回html字符串
 */
function multiplePicTpl(pics) {
  var htmlText = [];
  htmlText.push('<ul class="item-pic">');
  for (var i = 0, len = pics.length; i < len; i++) {
    htmlText.push('<img class="pic-item" src="' + pics[i] + '">')
  }
  htmlText.push('</ul>');
  return htmlText.join('');
}


function shareMessage(share){
  var htmlText = [];
  htmlText.push('<img src=');
  htmlText.push('"' + share.pic + '">');
  htmlText.push('<p>');
  htmlText.push(share.text);
  htmlText.push('</p>');


  
  return htmlText.join('');
}


/**
 * 循环：消息体 
 * @param {Object} messageData 对象
 */ 
function messageTpl(messageData) {
  var user = messageData.user;
  var content = messageData.content;
  var htmlText = [];
  htmlText.push('<div class="moments-item" data-index="0">');
  // 消息用户头像
  htmlText.push('<a class="item-left" href="#">');
  htmlText.push('<img src="' + user.avatar + '" width="42" height="42" alt=""/>');
  htmlText.push('</a>');
  // 消息右边内容
  htmlText.push('<div class="item-right">');
  // 消息内容-用户名称
  htmlText.push('<a href="#" class="item-name">' + user.name + '</a>');
  // 消息内容-文本信息
  htmlText.push('<p class="item-msg">' + content.text + '</p>');
  // 消息内容-图片列表 
  var contentHtml = '';
  // 目前只支持多图片消息，需要补充完成其余三种消息展示
  switch(content.type) {
      // 多图片消息
    case 0:
      contentHtml = multiplePicTpl(content.pics);
      break;
    case 1:
        contentHtml = shareMessage(content.share);
        break;
        // TODO: 实现分享消息
    case 2:
        contentHtml = multiplePicTpl(content.pics);
        break;
    case 3:
        contentHtml = multiplePicTpl(content.pics);
        break;
  }
  htmlText.push(contentHtml);
  // 消息时间和回复按钮
  htmlText.push('<div class="item-ft">');
  htmlText.push('<span class="item-time">' + content.timeString + '</span>');
  htmlText.push('<div class="item-reply-btn">');
  htmlText.push('<span class="item-reply"></span>');
  htmlText.push('</div></div>');
  // 消息回复模块（点赞和评论）
  htmlText.push(replyTpl(messageData.reply));
  htmlText.push('</div></div>');
  return htmlText.join('');
}


/**
 * 页面渲染函数：render
 */
function render() {
  // TODO: 目前只渲染了一个消息（多图片信息）,需要展示data数组中的所有消息数据。
  var messageHtml = messageTpl(data[0]) + messageTpl(data[1]) + messageTpl(data[2]) + messageTpl(data[3]);
  $momentsList.html(messageHtml);
  addRewardComment();
  commentCreate();
}


/**
 * 页面绑定事件函数：bindEvent
 */
function bindEvent() {
  // TODO: 完成页面交互功能事件绑定

  
  
  $body.on("click",'.item-reply-btn',RewardCommentOut);

 
  $body.on('click',clean);
  
  $body.on("click",'.reward',addlikeList);

  $body.on('click','.afterReward',removelikes);



  $body.on('click','.comment',commentOut);
 
  //$body.on('click',commentIn);
  $('.commentInput').on('click','.sendComment',sendcomment);
  
  

  $('.item-right').on('click','img',showImg);
  $overLay.on('click',hideImg);
  
 
 


  
 
}

/**
 * 页面入口函数：init
 * 1、根据数据页面内容
 * 2、绑定事件
 */
function init() {
  // 渲染页面
  render();
  
  bindEvent();
  
}

init();



//渲染点赞功能框
function addRewardComment(){
  var a = document.querySelectorAll('.item-ft');
  for (var i = 0 ,len = a.length;i<len;i++){
    var RewardComment=document.createElement("div");
    var reward=document.createElement("div");
    var afterReward=document.createElement('div');
    var comment=document.createElement("div");
    
    RewardComment.className="reward-comment";
    RewardComment.style.display="none";
    afterReward.className='afterReward'
    afterReward.style.display="none";
    reward.className="reward";
    comment.className="comment";
  
    reward.innerHTML='<i class="icon like"></i>点赞';
    afterReward.innerHTML='<i class="icon unlike"></i>取消';
    comment.innerHTML='<i class="icon commentimg"></i>评论';
    
    RewardComment.appendChild(reward);
    RewardComment.appendChild(afterReward);
    RewardComment.appendChild(comment);
    

    a[i].appendChild(RewardComment);

  }
}
//渲染评论框
function commentCreate(){
  var pagemoments=document.querySelector(".page-moments");
  var commentInput = document.createElement("div");

  commentInput.className="commentInput";
  commentInput.style.display="none";
  commentInput.innerHTML='<textarea class="textInput"></textarea> <button class="sendComment" name="sendComment" value="发送" ">发送<\/button>';
  pagemoments.appendChild(commentInput);

}







//点赞评论面板弹出
function RewardCommentOut(event){
    //if  (event.target.className == 'item-reply-btn'||event.target.className == 'item-reply'){
    //var $RewardComment=$(event.target).siblings('.reward-comment');
    var $RewardComment=$(event.target).parent().siblings('.reward-comment');
    $RewardComment.show();
    


    
    

}

//点赞评论面板缩回
function RewardCommentIn(event){
  
  if (event.target.className != 'item-reply'){
    $('.reward-comment').hide();
       
  }
  
}

//点赞增加
function addlikeList(event){
  
  var itemFt = $(event.target).parents('.item-ft');
  
  if (!itemFt.siblings('.reply-zone').children().is('.reply-like')){
    console.log('sss');
    var div = document.createElement('div');
    div.className='reply-like';
    div.innerHTML='<i class="icon-like-blue"></i>';
    var $replyzone = itemFt.siblings('.reply-zone');
    $replyzone.append(div);
  }
  var $likeList = itemFt.siblings('.reply-zone').children('.reply-like');  //获取名称点赞列表
  var a = document.createElement("a");
  
  a.className="reply-who";
  a.style.href="#";
  a.innerHTML = ","+userName;

  $likeList.append(a);
  $(event.target).siblings('.afterReward').show();
  $(event.target).hide();
  
}



//取消点赞
function removelikes(event){
  var itemFt = $(event.target).parents('.item-ft');
  var $likeList =itemFt.siblings('.reply-zone').children('.reply-like'); //获取名称点赞列表 
  
  $likeList.find(':last-child').remove();//最后一个
  $(event.target).siblings('.reward').show();
  $(event.target).hide();

  
}


//存在问题 当没有点赞人数时，无法增加 ；且取消点赞反复之后 ，点赞按钮有故障；取消点赞总是删除最后一个子节点。

function sendcomment(){
  var textInput=document.querySelector(".textInput").value;//获取输入内容  
  
  if(textInput != ''){
  var div = document.createElement('div');//创建每一个评论内容框架
  var commentUser=document.createElement("a");//创建发送者信息
  
  //var pagemoments=document.querySelector(".page-moments");
  
  
  commentUser.className="reply-who";
  commentUser.style.href="#";
  commentUser.innerHTML = userName + ":";
  div.appendChild(commentUser);//评论者信息加入一个输入框架
  
  
  var textInputNode=document.createTextNode(textInput);
  div.appendChild(textInputNode);
  
  div.className="comment-item";

  
  replyComment1.append(div);
  


  $('.commentInput').hide();
  document.querySelector(".textInput").value = '';
  }


}
//评论输入框弹出

function commentOut(event){
   $('.commentInput').show();
   var itemFt = $(event.target).parents('.item-ft');
   var replyComment =itemFt.siblings('.reply-zone').children('.reply-comment'); //获取评论列表框架
   replyComment1=replyComment;
}


function clean(){
  
  RewardCommentIn(event);
  commentIn(event);
}

function commentIn(event){

  var flag1 = $(event.target).is('.comment');
  var flag2 = $(event.target).is('.textInput');
  if(flag1||flag2){
    $('.commentInput').show();
  }else{
    $('.commentInput').hide();  }
  
}



//
function showImg(event)
{
	 //得到img对象
	 $img = $(event.target);
	 //得到src
	 var src = $img.attr('src');
	 $body.css({'overflow':'hidden'});
	 //释放蒙版
	 $overLay.removeClass('hidden');
	 $overLay.find('img').attr('src',src);
	 return false;
	
}
function hideImg()
{
	$overLay.addClass('hidden');
	 $body.css({'overflow':''});
	return false;
}





