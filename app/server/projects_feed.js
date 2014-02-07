RssFeed.publish('projects', function(query) {
  var self = this;

  self.setValue('title', self.cdata('Solvers.IO Projects'));
  self.setValue('description', self.cdata('Solvers.io is a community of people who want to improve our world.'));
  self.setValue('link', 'http://solvers.io');
  self.setValue('lastBuildDate', new Date());
  self.setValue('pubDate', new Date());
  self.setValue('ttl', 1);

  Projects.find({archived: { $nin: [1] }}, {sort: [["postedDate", "desc"]]}).forEach(function(doc) {
    self.addItem({
      title: doc.name,
      description: doc.description,
      link: 'http://solvers.io/' + doc._id,
      pubDate: new Date()
    });
  });

});