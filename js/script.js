'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-cloud-link').innerHTML),
  authorCountLink:  Handlebars.compile(document.querySelector('#template-authorCount-link').innerHTML)
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorsSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.authors.list';


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

      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);


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

    const links = document.querySelectorAll('.titles a');

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }

}

generateTitleLinks();

function calculateTagsParams(tags) {

  const params = {min: 999999, max: 0};
  for (let tag in tags) {

    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);

  }

  return params;

}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);

  return optCloudClassPrefix + classNumber;
}


function generateTags() {

   /* [NEW] create a new variable allTags with an empty array */

   let allTags = {};

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

      const linkHTMLData = {id: tag};
      const linkHTML = templates.tagLink(linkHTMLData);

      //const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li> ';

      /* add generated code to html variable */

      html = html + linkHTML;

       /* [NEW] check if this link is NOT already in allTags */

       if (!allTags[tag]) {

           /* [NEW] add tag to allTags object */

           allTags[tag] = 1;

       } else {

         allTags[tag]++;

       }


    /* END LOOP: for each tag */

      }

    /* insert HTML of all the links into the tags wrapper */

    for (let wrapper of tagWrapper) {
      wrapper.innerHTML = html;
      }

  /* END LOOP: for every article: */

    }

  /* [NEW] find list of tags in right column */

  const tagList = document.querySelectorAll('.tags');

  /* [NEW] create variable for all links HTML code */

  const tagsParams = calculateTagsParams(allTags);


   let allTagsData = {tags: []};

   /* [NEW] START LOOP: for each tag in allTags: */

   for (let tag in allTags) {

      /* [NEW] generate code of a link and add it to allTagsHTML */

      //allTagsHTML += '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '"><span>' + tag + '</span></a></li>';
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });
  /* [NEW] END LOOP: for each tag in allTags: */


 }

  /*[NEW] add HTML from allTagsHTML to tagList */

  for (let tag of tagList) {

    tag.innerHTML = templates.tagCloudLink(allTagsData);
    console.log(allTagsData);

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

  let allAuthors = {};

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

      const linkHTMLData = {id: author};
      const linkHTML = templates.authorLink(linkHTMLData);

      //const linkHTML = '<a href="#author-' + author + '"><span>' + author + '</span></a>';

      /* add generated code to html variable */

      html = html + linkHTML;

      if (!allAuthors[author]) {

        allAuthors[author] = 1;

      } else {

        allAuthors[author]++;

      }

    /* insert HTML of all the links into the author wrapper */

    for (let wrapper of authorWrapper) {
      wrapper.innerHTML = html;
    }

  /* END LOOP: for every article: */

  }

  const authorList = document.querySelectorAll('.authors');

  let allAuthorsData = {authors: []};

  for (let author in allAuthors) {

    allAuthorsData.authors.push ({
      author: author,
      count: allAuthors[author]
    });

    //allAuthorsHTML += '<li><a href="#author-' + author + '"><span>' + author + '</span>' + ' (' + allAuthors[author] + ')' +'</a></li>';

  }

  for (let author of authorList) {
    author.innerHTML = templates.authorCountLink(allAuthorsData);
    console.log(allAuthorsData);
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
