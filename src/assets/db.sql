INSERT INTO `category` (`id`, `create_by`, `create_date`, `name`, `status`, `update_by`, `update_date`) VALUES ('', 'admin', CURRENT_DATE(), 'mocktail', 'active', NULL, NULL);


INSERT INTO 'category'(id,name,status,create_by,create_date) 
  VALUES('1','mocktail', 'active','admin',CURRENT_TIMESTAMP()),
        ('2','cocktail', 'active','admin',CURRENT_TIMESTAMP()),
        ('3','appetizers', 'active','admin',CURRENT_TIMESTAMP());
     
     /*id	create_by	create_date	name	price	status	update_by	update_date	description	path	category_id */
     
INSERT INTO item (id,name,price,status,description, path,create_by,create_date, category_id )
     VALUES 
     (1,'Sweet Adeline',300,'active','orange-spice black tea blend into a hot mix of pomegranate juice and cinnamon syrup',
     'https://www.thespruceeats.com/thmb/tH26KI6ByF0tB0df1pBAb4r82Do=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/SweetAdeline-184832349-56a173485f9b58b7d0bf638a.jpg',
     'admin', CURRENT_TIMESTAMP(), 1
     ),
     (2,'Lime Rickey',400,'active','Lime Flavoured soda,fresh juice,simple syrup, and seltzer',
     'https://www.thespruceeats.com/thmb/iZgP0fnMBtTk5ls9004r7F1rCIk=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/lime-rickey-908792-hero-5c25321646e0fb0001ebbbdf.jpg',
     'admin', CURRENT_TIMESTAMP(), 1
     ),
     (3,'Arnold Palmer',350,'active','Arguably the best-known of all the virgin drinks, there is no big secret to making a great Arnold Palmer. Created by and named for the famous golfer, this refreshing drink is nothing more than iced tea and lemonade. Though it may be simple, there are ways to enhance the base and even give it a fresh new spin.r',
     'https://www.thespruceeats.com/thmb/NS5mUC45NXa2CqzbbNLywU6VwLc=/1773x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/_arnold-palmer-mocktail-recipe-760357-hero-5bc4e793c9e77c0051578f4d.jpg',
     'admin', CURRENT_TIMESTAMP(), 1
     ),
     (4,'Shirley Temple',400,'active','a favorite for kids and adults alike and there is no need to wait for your next night out to enjoy this semi-sweet old-fashioned soda. All you need is grenadine, lemon-lime soda, and ginger ale.',
     'https://www.thespruceeats.com/thmb/abN51-IpoeHjYXPBgOIuJnGx0_o=/1729x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/shirley-temple-cocktail-recipe-760600-Final-5baa65b6c9e77c00502f82ec.jpg',
     'admin', CURRENT_TIMESTAMP(), 1
     ),
     (5,'Virgin Mary',400,'active','In the morning, you can start your day off right with a freshly prepared virgin mary. It has all the great vitamins and spice of the bloody mary, without the vodka. You can develop your own special recipe, so it's exactly how you like it and it's perfect for any time you need some quick energy.',
     'https://www.thespruceeats.com/thmb/uFraUSoMW3UQVS6FTEs2nKHaAXM=/1974x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/virgin-mary-mocktail-recipe-760925-15-5b4505cb46e0fb0037d48b6d.jpg',
     'admin', CURRENT_TIMESTAMP(), 1
     ),
     (6,'Sweet Sunrise',500,'active','In a similar fashion, the sweet sunrise is an excellent breakfast, brunch, or afternoon drink that skips the liquor of a very popular cocktail. Also called the virgin sunrise, it is nothing more than a tequila sunrise, hold the tequila. Grenadine adds a great contrast to fresh-squeezed orange juice, giving it the ideal amount of sweetness.',
     'https://www.thespruceeats.com/thmb/fqIVVIpDAzCFXIbXWotmrwMgKPo=/1974x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/_sweet-sunrise-brunch-mocktail-760380-hero-5bca40e546e0fb0051766aa8.jpg',
     'admin', CURRENT_TIMESTAMP(), 1
     ),
     (7,'Baby Bellini',400,'active','The Bellini is a popular choice when you are hosting a fancier brunch. This Champagne cocktail can also be transformed into an innocent beverage without losing any of the taste. When you switch the wine out for a sparkling cider, you have the baby Bellini. It is a fantastic peach-flavored drink everyone will love.',
     'https://www.thespruceeats.com/thmb/uHhAkRnG5ybYAKQM1Ajnf57A9ao=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/BabyBellini-135621079-56a170715f9b58b7d0bf4d0e.jpg',
     'admin', CURRENT_TIMESTAMP(), 1
     ),
     (8,'Thanksgiving Punch',430,'active',
     ' This non-alcoholic punch has a base of apple cider, sparkling blood orange juice, and sparkling grape juice, all brightened up with fresh orange and cranberry. Serve in martini glasses garnished with a slice of orange. If you are looking to spike it for a harder drink, add a splash of rum, reposado tequila, or anejo tequila to transform this mocktail into a cocktail.',
     'https://www.thespruceeats.com/thmb/2DGO56wcxrFM8v_YUn1JrEghU9A=/2150x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/ThanksgivingPunch-007-c94e609eca894b8c8a26a00a283b9983.jpg',
     'admin', CURRENT_TIMESTAMP(), 1
     ),
     (9,'Egg Cream',370,'active',
     'Step back in time with a favorite from the days of old-fashioned soda fountains. New York egg cream is fun, refreshing, and incredibly easy to make at home. Though the original version was made with egg, it now requires nothing more than milk, chocolate syrup, and seltzer. It is like carbonated chocolate milk, but the taste is so much more than that.',
     'https://www.thespruceeats.com/thmb/WG5MzWpwn4PeIedraQQ6PmK4mes=/1650x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/EggCreamHERO-f50dcc4564f6449b9e1ef6afed5b3e61.jpg','admin', CURRENT_TIMESTAMP(), 1
     ),
     (10,'Hot Not Toddy', 400,'active',
     'In the dead of winter, you will want a steaming cup to warm you up. That is where the hot not toddy comes into play. It skips the liquors traditionally used in toddies, opting for freshly brewed tea, lemon juice, and an array of warming spices instead. It is also a great comfort when you are feeling under the weather.',
     'https://www.thespruceeats.com/thmb/WG5MzWpwn4PeIedraQQ6PmK4mes=/1650x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/EggCreamHERO-f50dcc4564f6449b9e1ef6afed5b3e61.jpg',
     'admin', CURRENT_TIMESTAMP(), 1
     ),


     INSERT INTO `item` (`id`, `create_by`, `create_date`, `name`, `price`, `status`, `update_by`, `update_date`, `description`, `path`, `category_id`) VALUES ('12', 'admin', CURRENT_TIMESTAMP(), 'Designated Appletini', '400', 'active', NULL, NULL, 'Appletinis are great and you can even enjoy one when you\'re the night\'s designated driver. The designated appletini is a simple twist on the favorite vodka martini, shaking apple juice with lemon juice and simple syrup. Serve it in a cocktail glass, enjoy the party just like everyone else, and feel good about getting everyone home safe.', 'https://www.thespruceeats.com/thmb/uYabS1_Eo6z52fQ5Rk5M0cXPWeY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/designated-appletini-56a172865f9b58b7d0bf5e96.jpg', '1')



INSERT INTO `itemdetails` (`id`, `create_by`, `create_date`, `description`, `status`, `update_by`, `update_date`, `item_id`)
VALUES 
('1', 'admin', UTC_TIMESTAMP(), NULL, 'active', 'admin', UTC_TIMESTAMP(), '1'), 
('2', 'admin', UTC_TIMESTAMP(), NULL, 'active', 'admin', UTC_TIMESTAMP(), '2'),
('3', 'admin', UTC_TIMESTAMP(), NULL, 'active', 'admin', UTC_TIMESTAMP(), '3'),
('4', 'admin', UTC_TIMESTAMP(), NULL, 'active', 'admin', UTC_TIMESTAMP(), '4');






     

     
     