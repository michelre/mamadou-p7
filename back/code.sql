
-- CREATION TABLE USERS                       ATTention aux "" et ``  pour les requêtes dans les ctrls
CREATE TABLE IF NOT EXISTS users (
  user_id INT NOT NULL AUTO_INCREMENT,
  user_firstname varchar(30) NOT NULL,
  user_lastname varchar(30) NOT NULL,
  user_email varchar(100) NOT NULL DEFAULT '',
  user_password varchar(200) NOT NULL,
  admin BOOLEAN NOT NULL DEFAULT '0',
  active BOOLEAN NOT NULL  DEFAULT '1',
  user_description varchar(255) DEFAULT "",
  user_picture VARCHAR(250) DEFAULT "",
  createdAt TIMESTAMP ,
  updatedAt TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
  
  PRIMARY KEY (user_id),
  UNIQUE (user_email)
)ENGINE=InnoDB;


-- CREATION TABLE POSTs
CREATE TABLE IF NOT EXISTS posts (
  post_id int NOT NULL AUTO_INCREMENT,
  post_user_id int NOT NULL,
  date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  content TEXT NOT NULL,
  likes varchar(255)  DEFAULT NULL,
  active tinyint(1) NOT NULL DEFAULT 1,
  post_imageUrl VARCHAR(255),
  PRIMARY KEY (post_id),
  CONSTRAINT fk_Posts_Users_id  FOREIGN KEY (post_user_id) REFERENCES users (user_id) ON DELETE CASCADE
)ENGINE=InnoDB;



-- CREATION TABLE LIKES
CREATE TABLE IF NOT EXISTS likes (
  id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  post_id int NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_Likes_Posts_id FOREIGN KEY (post_id) REFERENCES posts (post_id) ON DELETE CASCADE,
  CONSTRAINT fk_Likes_Users_id  FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE

) ENGINE=InnoDB;

-- CREATION TABLE COMMENTS
CREATE TABLE IF NOT EXISTS comments (
  id int NOT NULL AUTO_INCREMENT,
  post_id int NOT NULL,
  author_id int NOT NULL,
  message TEXT NOT NULL,
  likes int NOT NULL DEFAULT '0',
  created_At TIMESTAMP ,
  updated_At TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_Comments_Users_id  FOREIGN KEY (author_id) REFERENCES users (user_id) ON DELETE CASCADE,
  CONSTRAINT fk_Comments_Posts_id  FOREIGN KEY (post_id) REFERENCES posts (post_id) ON DELETE CASCADE
) ENGINE=InnoDB;


