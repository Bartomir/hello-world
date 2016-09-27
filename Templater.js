// ==UserScript==
// @name        jira templater
// @namespace   bartosz.jeske@stxnext.pl
// @include     https://knmp.stxnext.pl/*
// @version     1.1
// @grant       none
// ==/UserScript==

var template_issues = [];
template_issues["Bug"] = "https://knmp.stxnext.pl//rest/api/2/issue/TEM-2";
jQuery(["New Feature", "Improvement", "Task", "Epic"]).each(function (i, name) {
  template_issues[name] = "https://knmp.stxnext.pl//rest/api/2/issue/TEM-1";
});

jQuery( document ).ready(function() {
  function insert_template(e) {
    var issue_type_active = jQuery('#issuetype-field').val();
    var template_issue_url = template_issues[issue_type_active];
    
    jQuery.getJSON(template_issue_url, function( data ) {
      var desc = jQuery('#description');
      desc.append(data.fields.description);
    });
    
    e.preventDefault();
  }
  
  jQuery("#jira").bind("DOMNodeInserted", function() {
      if (
        (
          jQuery('#create-issue-dialog').length ||
          jQuery('#edit-issue-dialog').length
        )
        && !jQuery('#template_paster').length
      ) {
        var desc = jQuery('#description');
        var paster_btns = jQuery("<div id=\"template_paster\" />");
        paster_btns.insertBefore(desc);
        
        var btn = jQuery("<a>Insert template</a>");
        paster_btns.append(btn);
        btn.click(insert_template);
      }
  });
});
