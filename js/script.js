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
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorsSelector = '.post-author';

function generateTitleLinks(customSelector = '') {

  /* [DONE] remove contents of titleList */

  const titleList = document.querySelectorAll(optTitleListSelector);
  for (let titleLists of titleList) {
    titleLists.innerHTML = '';
  }

  /* for each article */

  /* find all the articles and save them to variable: articles */

  let html = '';

    const articles = document.querySelectorAll(optArticleSelector + customSelector);
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

function generateTags() {

  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */

  for (let article of articles) {

    /* find tags wrapper */

  const tagWrapper = article.querySelectorAll(optArticleTagsSelector);

  for (let wrapper of tagWrapper) {
    wrapper.innerHTML = '';
  }


    /* make html variable with empty string */

    let html = '';

    /* get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');


    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */

    for (let tag of articleTagsArray) {

      /* generate HTML of the link */;

      const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li> ';

      /* add generated code to html variable */

      html = html + linkHTML;

    /* END LOOP: for each tag */

      }

    /* insert HTML of all the links into the tags wrapper */

    for (let wrapper of tagWrapper) {
      wrapper.innerHTML = html;
    }

  /* END LOOP: for every article: */

  }

}

generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');


  /* make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */

  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */

  for (let tagLink of tagLinks) {

    /* remove class active */

    tagLink.classList.remove('active');

  /* END LOOP: for each active tag link */

}

  /* find all tag links with "href" attribute equal to the "href" constant */

  const equalLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */

  for (let equalLink of equalLinks) {

    /* add class active */

    equalLink.classList.add('active');
    console.log(equalLink);

  /* END LOOP: for each found tag link */

    }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */

  const tagLinks = document.querySelectorAll('[href^="#tag-"]');

  /* START LOOP: for each link */

  for (let tagLink of tagLinks) {

    /* add tagClickHandler as event listener for that link */

    tagLink.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors() {

  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */

  for (let article of articles) {

    /* find author wrapper */

    const authorWrapper = article.querySelectorAll(optArticleAuthorsSelector);

    for (let wrapper of authorWrapper) {
      wrapper.innerHTML = '';
    }

    /* make html variable with empty string */

    let html = '';

    /* get authors from data-author attribute */

    const author = article.getAttribute('data-author');

      /* generate HTML of the link */

      const linkHTML = '<a href="#author-' + author + '"><span>' + author + '</span></a>';

      /* add generated code to html variable */

      html = html + linkHTML;

    /* insert HTML of all the links into the author wrapper */

    for (let wrapper of authorWrapper) {
      wrapper.innerHTML = html;
    }

  /* END LOOP: for every article: */

  }

}

generateAuthors();

function authorClickHandler(event) {

  /* prevent default action for this event */

  event.preventDefault();

 /* make new constant named "clickedElement" and give it the value of "this" */

 const clickedElement = this;

 /* make a new constant "href" and read the attribute "href" of the clicked element */

 const href = clickedElement.getAttribute('href');

 /* make a new constant "author" and extract author from the "href" constant */

 const author = href.replace('#author-', '');

 /* find all author links with class active */

 const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');

 /* START LOOP: for each active author link */

 for (let activeAuthorLink of authorLinks) {

   /* remove class active */

   activeAuthorLink.classList.remove('active');

 /* END LOOP: for each active author link */

  }

 /* find all author links with "href" attribute equal to the "href" constant */

 const evenLinks = document.querySelectorAll('a[href="' + href + '"]');

 /* START LOOP: for each found author link */

 for (let evenLink of evenLinks) {

   /* add class active */

   evenLink.classList.add('active');
   console.log(evenLink);
 /* END LOOP: for each found author link */

  }

 /* execute function "generateTitleLinks" with article selector as argument */

 generateTitleLinks('[data-author="' + author + '"]');

}

function addClickListenersToAuthors() {

  /* find all links to authors */

  const authorsLinks = document.querySelectorAll('[href^="#author-"]');

 /* START LOOP: for each link */

 for (let authorsLink of authorsLinks) {

   /* add authorClickHandler as event listener for that link */

   authorsLink.addEventListener('click', authorClickHandler);

 /* END LOOP: for each link */

  }

}

addClickListenersToAuthors();

const links = document.querySelectorAll('.titles a');

for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}
