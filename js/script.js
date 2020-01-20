'use strict';

/*
document.getElementById('test-button').addEventListener('click', function(){
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
});
*/

const titleClickHandler = function(event) {
  event.preventDefault();
  const clickedElement = this;



  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts article.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');

  }

  /* [DONE] get 'href' attribute from the clicked link */

const linkAttribute = clickedElement.getAttribute('href');


  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

const correctArticles = document.querySelectorAll(linkAttribute);


  /* [DONE] add class 'active' to the correct article */

for (let correctArticle of correctArticles) {
  correctArticle.classList.add('active');
}

}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks() {

  /* [DONE] remove contents of titleList */

  const titleList = document.querySelectorAll(optTitleListSelector);
  for (let titleLists of titleList) {
    titleLists.innerHTML = '';
  }

  /* for each article */

  /* find all the articles and save them to variable: articles */

  let html = '';

    const articles = document.querySelectorAll(optArticleSelector);
    for (let article of articles) {

      /* [DONE] get the article id */

      const articleId = article.getAttribute('id');

      /* [DONE] find the title element & get the title from the title element */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* [DONE] create HTML of the link */

      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

      /* OPTION 1: [DONE] insert link into titleList */
      /*
      for (let titleList of titleLists) {
        titleList.insertAdjacentHTML('beforeend', linkHTML);
      }
      */

      /* OPTION 2: insert link into htm variable */

        html = html + linkHTML;
    }

    for (let titleLists of titleList) {
      titleLists.innerHTML = html;
    }


}

generateTitleLinks();

const links = document.querySelectorAll('.titles a');
console.log(links);

for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}
