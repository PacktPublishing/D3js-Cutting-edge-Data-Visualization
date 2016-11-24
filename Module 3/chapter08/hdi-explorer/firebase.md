---
layout: main-sharing
title: HDI Explorer
---

{% include country-information.html %}

<div class="container-fluid">
    <div class="row">

        <!-- HDI Chart -->
        <div class="col-md-8" id="chart"></div>

        <div class="col-md-4">

            <!-- Country Summary Table -->
            <div class="country-summary container-fluid" id="table"></div>

            <!-- Sharing Buttons -->
            <div class="sharing">
                <span class="sharing-title">share</span>

                <!-- Twitter Share Button -->
                <a href="https://twitter.com/share"
                    class="twitter-share-button"
                    data-url="http://pnavarrc.github.io/hdi-explorer/share"
                    data-text="Explore Human Development Index trends by country."
                    data-via="pnavarrc"
                    data-related="pnavarrc"
                    data-count="none"
                    data-hashtags="masteringd3js">Tweet</a>

                <!-- Facebook Share Button -->
                <div class="fb-share-button"
                    data-href="http://pnavarrc.github.io/hdi-explorer/share/"
                    data-type="button"></div>

                <!-- Google Plus Button -->
                <div class="g-plusone"
                    data-size="medium"
                    data-annotation="none"
                    data-href="http://pnavarrc.github.io/hdi-explorer/share/"></div>
            </div>

        </div>

    </div>

    <div class="row">
        <div class="col-md-8">
            <div id="comments-section">
                <div id="disqus_thread"></div>
            </div>
        </div>
        <div class="col-md-4"></div>
    </div>

</div>

<script src="{{ site.baseurl }}/dependencies.min.js"></script>
<script src="{{ site.baseurl }}/hdi.min.js"></script>

<!-- Twitter -->
<script>
!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');
</script>

<!-- Facebook -->
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>

<!-- Google Plus -->
<script type="text/javascript">
  (function() {
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/platform.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
  })();
</script>

<script type="text/javascript">
    // Disqus Configuration Variables
    var disqus_shortname = 'hdi-explorer';

    (function() {
    var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
    dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    })();
</script>
<noscript>Please enable JavaScript to view the <a href="http://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
<a href="http://disqus.com" class="dsq-brlink">comments powered by <span class="logo-disqus">Disqus</span></a>

<script>
  // Connect to the Firebase application and retrieve the data reference
  var dataref = new Firebase('https://hdi-explorer.firebaseio.com/');

  // Update the application state when the value of the data changes in Firebase
  dataref.on('value', function(snapshot) {
    app.state.set('code', snapshot.val().code);
  });

  // The model will update the object with the selected country code.
  app.state.on('change:code', function(model) {
    dataref.set({code: model.get('code')});
  });

</script>
