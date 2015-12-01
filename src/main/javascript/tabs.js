function tabTheSource($content) {
    var $UL = $('<ul class="nav nav-tabs" role="tablist"/>');
    var $LI = $('<li role="presentation"/>');
    var $A = $('<a role="tab" data-toggle="tab" style="text-decoration:none;"/>');
    var $WRAPPER = $('<div class="tab-content content"/>');
    var snippets = [];
    var languageEventElements = {};
    $('div.tabbed-example', $content).each(function () {
        var $exampleBlock = $(this);
        var title = $exampleBlock.children('div.title', this).first().text();
        var languages = [];
        var $languageBlocks = {};
        $('div.listingblock', this).each(function () {
            var language = $('code', this).data('lang');
            languages.push(language);
            $languageBlocks[language] = $(this);
        });
        if (languages.length > 1) {
            snippets.push({
                '$exampleBlock': $exampleBlock,
                'languages': languages,
                '$languageBlocks': $languageBlocks
            });
        }
    });
    var idNum = 0;
    for (var ix = 0; ix < snippets.length; ix++) {
        var snippet = snippets[ix];
        var languages = snippet.languages;
        var $languageBlocks = snippet.$languageBlocks;
        var $exampleBlock = snippet.$exampleBlock;
        var idBase = 'tabbed-example-' + idNum++;
        var $wrapper = $WRAPPER.clone();
        var $ul = $UL.clone();
        for (var i = 0; i < languages.length; i++) {
            var language = languages[i];
            var $content = $($languageBlocks[language]);
            var id;
            if ($content.attr('id')) {
                id = $content.attr('id');
            } else {
                id = idBase + '-' + language;
                $content.attr('id', id);
            }
            $content.addClass('tab-pane').css('position', 'relative');
            var $li = $LI.clone();
            var $a = $A.clone();
            $a.attr('href', '#' + id).text(language).data('lang', language).on('shown.bs.tab', function (e) {
                var language = $(e.target).data('lang');
                var $elements = languageEventElements[language];
                for (var j = 0; j < $elements.length; j++) {
                    $elements[j].tab('show');
                }
            });
            if (language in languageEventElements) {
                languageEventElements[language].push($a);
            } else {
                languageEventElements[language] = [$a];
            }
            $wrapper.append($content);
            if (i === 0) {
                $li.addClass('active');
                $content.addClass('active');
            }
            $li.append($a);
            $ul.append($li);
        }
        $exampleBlock.children('div.content').first().replaceWith($ul);
        $exampleBlock.append($wrapper);
    }
}
