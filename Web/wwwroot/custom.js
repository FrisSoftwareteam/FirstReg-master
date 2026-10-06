var subform = $('#frm_sub');
var subbtn = $('#bt_sub');

subform.submit(function (e) {
    e.preventDefault();

    subbtn.val(subbtn.attr('data-wait'));

    $.ajax({
        type: "POST",
        url: subform.attr('action'),
        data: subform.serialize(),
        cache: false,
        success: function () {
            subbtn.val('Done!');
            subbtn.addClass('d-none');
            subform.addClass('d-none');

            $('#p_submsg').html('Thank you for subscribing to our mailing list. You will now get updated with latest news, articles, and resources.')
        },
        error: function () {
            $('#p_submsg').html('We could not complete your request to join out mailing list, please try again.')
            subbtn.val('Subscribe');
        },
        complete: function () {
            // done
        }
    });
});

$(function () {
    var $onlineAccess = $('.main-header .action-btns a.btn-primary[href*="access.firstregistrarsnigeria.com"]').first();
    if ($onlineAccess.length && $('.main-header .action-btns a[href*="v0-frisformupdate.vercel.app"]').length === 0 && $('.main-header .action-btns a[href="/forms"]').length === 0) {
        $('<a/>', {
            href: 'https://v0-frisformupdate.vercel.app',
            text: 'Forms',
            class: 'btn btn-primary me-2',
            target: '_blank',
            rel: 'noopener'
        }).insertBefore($onlineAccess);
    }
});
