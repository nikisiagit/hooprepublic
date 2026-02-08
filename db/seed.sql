-- Generated seed SQL for HoopRepublic courts
-- Run this with: npx wrangler d1 execute hooprepublic-db --file=./db/seed.sql

INSERT INTO courts (id, name, description, address, postcode, borough, latitude, longitude, status)
VALUES ('court_zswjumnnfi', 'Ravenscourt Park', 'Popular outdoor basketball court in West London with a scenic park setting. Multiple courts with strong local hoop culture. One of the best spots for streetball in London.', 'Ravenscourt Park, Ravenscourt Road, Hammersmith', 'W6 0UL', 'Hammersmith and Fulham', 51.4943, -0.2366, 'approved');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_zswjumnnfi', 'tag_outdoor');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_zswjumnnfi', 'tag_concrete');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_zswjumnnfi', 'tag_free');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_zswjumnnfi', 'tag_fullcourt');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_zswjumnnfi', 'tag_public');

INSERT INTO courts (id, name, description, address, postcode, borough, latitude, longitude, status)
VALUES ('court_zh1k3rkajfi', 'Argyle Square Basketball Court', 'Outdoor public court near King''s Cross with rubber flooring and lighting. Full court with regulation height hoops and wheelchair access.', 'Argyle Square, King''s Cross', 'WC1H 8EG', 'Camden', 51.5302, -0.122, 'approved');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_zh1k3rkajfi', 'tag_outdoor');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_zh1k3rkajfi', 'tag_synthetic');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_zh1k3rkajfi', 'tag_free');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_zh1k3rkajfi', 'tag_fullcourt');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_zh1k3rkajfi', 'tag_lighting');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_zh1k3rkajfi', 'tag_public');

INSERT INTO courts (id, name, description, address, postcode, borough, latitude, longitude, status)
VALUES ('court_3fi75hj07qp', 'Finsbury Park', 'One of North London''s most popular outdoor courts. Multiple hoops with rubber flooring and regulation height. Draws players of all skill levels for competitive pick-up games.', 'Finsbury Park, Seven Sisters Road', 'N4 2PH', 'Haringey', 51.5655, -0.1027, 'approved');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_3fi75hj07qp', 'tag_outdoor');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_3fi75hj07qp', 'tag_synthetic');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_3fi75hj07qp', 'tag_free');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_3fi75hj07qp', 'tag_fullcourt');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_3fi75hj07qp', 'tag_public');

INSERT INTO courts (id, name, description, address, postcode, borough, latitude, longitude, status)
VALUES ('court_ifrvjdtelwn', 'The Regal', 'Indoor public basketball facility in central London. Full court with hardwood flooring, lighting, and wheelchair access.', 'The Regal, Queensway', 'W2 4SJ', 'Westminster', 51.5115, -0.1879, 'approved');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_ifrvjdtelwn', 'tag_indoor');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_ifrvjdtelwn', 'tag_hardwood');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_ifrvjdtelwn', 'tag_paid');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_ifrvjdtelwn', 'tag_fullcourt');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_ifrvjdtelwn', 'tag_lighting');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_ifrvjdtelwn', 'tag_public');

INSERT INTO courts (id, name, description, address, postcode, borough, latitude, longitude, status)
VALUES ('court_ssvupnc9aes', 'Crescent Basketball Court', 'Outdoor public full court in Crouch End. Great spot for pick-up games in North London.', 'Crescent Road, Crouch End', 'N8 8AX', 'Haringey', 51.5812, -0.1183, 'approved');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_ssvupnc9aes', 'tag_outdoor');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_ssvupnc9aes', 'tag_concrete');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_ssvupnc9aes', 'tag_free');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_ssvupnc9aes', 'tag_fullcourt');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_ssvupnc9aes', 'tag_public');

INSERT INTO courts (id, name, description, address, postcode, borough, latitude, longitude, status)
VALUES ('court_yj5o3qxorh', 'Turnpike Lane', 'Outdoor public court near Turnpike Lane station. Popular spot in North London.', 'Turnpike Lane, Wood Green', 'N8 0DU', 'Haringey', 51.5901, -0.1031, 'approved');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_yj5o3qxorh', 'tag_outdoor');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_yj5o3qxorh', 'tag_concrete');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_yj5o3qxorh', 'tag_free');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_yj5o3qxorh', 'tag_public');

INSERT INTO courts (id, name, description, address, postcode, borough, latitude, longitude, status)
VALUES ('court_yhpw7rp5w1m', 'Oval Court', 'Outdoor public basketball court near The Oval. Accessible location in South London.', 'Kennington Oval, Kennington', 'SE11 5SS', 'Lambeth', 51.4837, -0.1133, 'approved');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_yhpw7rp5w1m', 'tag_outdoor');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_yhpw7rp5w1m', 'tag_concrete');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_yhpw7rp5w1m', 'tag_free');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_yhpw7rp5w1m', 'tag_public');

INSERT INTO courts (id, name, description, address, postcode, borough, latitude, longitude, status)
VALUES ('court_ufecqt3wx9m', 'Bethnal Green', 'Multiple outdoor courts near Bethnal Green station. Concrete flooring with dunk rims and wheelchair access. Good for pick-up games in East London.', 'Bethnal Green Gardens, Bethnal Green Road', 'E2 0AG', 'Tower Hamlets', 51.5274, -0.0551, 'approved');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_ufecqt3wx9m', 'tag_outdoor');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_ufecqt3wx9m', 'tag_concrete');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_ufecqt3wx9m', 'tag_free');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_ufecqt3wx9m', 'tag_fullcourt');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_ufecqt3wx9m', 'tag_public');

INSERT INTO courts (id, name, description, address, postcode, borough, latitude, longitude, status)
VALUES ('court_5hbk1ejqjdo', 'Crown Basketball Court', 'Outdoor public full court with regulation height hoops. Concrete flooring with wheelchair access.', 'Crown Road, Morden', 'SM4 5BT', 'Merton', 51.3976, -0.2048, 'approved');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_5hbk1ejqjdo', 'tag_outdoor');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_5hbk1ejqjdo', 'tag_concrete');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_5hbk1ejqjdo', 'tag_free');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_5hbk1ejqjdo', 'tag_fullcourt');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_5hbk1ejqjdo', 'tag_public');

INSERT INTO courts (id, name, description, address, postcode, borough, latitude, longitude, status)
VALUES ('court_sxb45f48jnq', 'Kilburn Grange Park', 'Outdoor public court in a lovely park setting. Great for casual games in North West London.', 'Kilburn Grange Park, Kilburn', 'NW6 5SB', 'Camden', 51.5449, -0.199, 'approved');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_sxb45f48jnq', 'tag_outdoor');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_sxb45f48jnq', 'tag_concrete');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_sxb45f48jnq', 'tag_free');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_sxb45f48jnq', 'tag_public');

INSERT INTO courts (id, name, description, address, postcode, borough, latitude, longitude, status)
VALUES ('court_6365int0uss', 'Clapham Common Park', 'Multiple hoops in a great park! Outdoor courts with adjustable rims, lighting, and wheelchair access. Popular for pick-up games in South London.', 'Clapham Common, Windmill Drive', 'SW4 9DE', 'Lambeth', 51.4615, -0.138, 'approved');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_6365int0uss', 'tag_outdoor');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_6365int0uss', 'tag_concrete');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_6365int0uss', 'tag_free');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_6365int0uss', 'tag_fullcourt');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_6365int0uss', 'tag_lighting');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_6365int0uss', 'tag_public');

INSERT INTO courts (id, name, description, address, postcode, borough, latitude, longitude, status)
VALUES ('court_stkuhp795sd', 'Hilly Fields Court', 'Multiple outdoor courts in Hilly Fields park. Popular spot in South East London.', 'Hilly Fields, Brockley', 'SE4 1QE', 'Lewisham', 51.4585, -0.0337, 'approved');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_stkuhp795sd', 'tag_outdoor');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_stkuhp795sd', 'tag_concrete');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_stkuhp795sd', 'tag_free');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_stkuhp795sd', 'tag_fullcourt');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_stkuhp795sd', 'tag_public');

INSERT INTO courts (id, name, description, address, postcode, borough, latitude, longitude, status)
VALUES ('court_mhxym03621o', 'Garratt Park', 'Full court in a park setting with pick-up games. Concrete floor in South West London.', 'Garratt Park, Garratt Lane, Earlsfield', 'SW17 0NY', 'Wandsworth', 51.441, -0.1895, 'approved');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_mhxym03621o', 'tag_outdoor');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_mhxym03621o', 'tag_concrete');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_mhxym03621o', 'tag_free');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_mhxym03621o', 'tag_fullcourt');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_mhxym03621o', 'tag_public');

INSERT INTO courts (id, name, description, address, postcode, borough, latitude, longitude, status)
VALUES ('court_0w99tgr66ped', 'Dulwich Park', 'Outdoor court in beautiful Dulwich Park. Great spot for basketball in South East London.', 'Dulwich Park, College Road', 'SE21 7BQ', 'Southwark', 51.4455, -0.0773, 'approved');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_0w99tgr66ped', 'tag_outdoor');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_0w99tgr66ped', 'tag_concrete');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_0w99tgr66ped', 'tag_free');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_0w99tgr66ped', 'tag_public');

INSERT INTO courts (id, name, description, address, postcode, borough, latitude, longitude, status)
VALUES ('court_378tkhdh8ll', 'Acton Park', 'Full court in Acton Park with pick-up games. Concrete floor in West London.', 'Acton Park, The Vale, Acton', 'W3 7JT', 'Ealing', 51.5108, -0.2747, 'approved');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_378tkhdh8ll', 'tag_outdoor');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_378tkhdh8ll', 'tag_concrete');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_378tkhdh8ll', 'tag_free');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_378tkhdh8ll', 'tag_fullcourt');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_378tkhdh8ll', 'tag_public');

INSERT INTO courts (id, name, description, address, postcode, borough, latitude, longitude, status)
VALUES ('court_6xfnfk9c79f', 'Bourne Estate', 'Outdoor public court near Clerkenwell. Central London location.', 'Bourne Estate, Portpool Lane, Clerkenwell', 'EC1N 7UD', 'Camden', 51.5218, -0.1095, 'approved');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_6xfnfk9c79f', 'tag_outdoor');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_6xfnfk9c79f', 'tag_concrete');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_6xfnfk9c79f', 'tag_free');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_6xfnfk9c79f', 'tag_public');

INSERT INTO courts (id, name, description, address, postcode, borough, latitude, longitude, status)
VALUES ('court_gp8pwzjou2w', 'Leyton Manor Park', 'Outdoor public court in Leyton. Great spot for basketball in East London.', 'Leyton Manor Park, Church Road, Leyton', 'E10 5JG', 'Waltham Forest', 51.5683, -0.0197, 'approved');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_gp8pwzjou2w', 'tag_outdoor');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_gp8pwzjou2w', 'tag_concrete');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_gp8pwzjou2w', 'tag_free');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_gp8pwzjou2w', 'tag_public');

INSERT INTO courts (id, name, description, address, postcode, borough, latitude, longitude, status)
VALUES ('court_1cdkdhohm4u', 'Haverstock School', 'Indoor private courts at Haverstock School. Multiple courts with hardwood flooring, lighting, and wheelchair access. Regulation height hoops.', 'Haverstock School, Crogsland Road, Chalk Farm', 'NW1 8YT', 'Camden', 51.5503, -0.1502, 'approved');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_1cdkdhohm4u', 'tag_indoor');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_1cdkdhohm4u', 'tag_hardwood');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_1cdkdhohm4u', 'tag_membership');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_1cdkdhohm4u', 'tag_fullcourt');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_1cdkdhohm4u', 'tag_lighting');

INSERT INTO courts (id, name, description, address, postcode, borough, latitude, longitude, status)
VALUES ('court_76gg1x0xw1w', 'Alderny Street', 'Outdoor public court in Pimlico. Central London location for pick-up games.', 'Alderny Street, Pimlico', 'SW1V 4EU', 'Westminster', 51.4875, -0.1384, 'approved');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_76gg1x0xw1w', 'tag_outdoor');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_76gg1x0xw1w', 'tag_concrete');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_76gg1x0xw1w', 'tag_free');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_76gg1x0xw1w', 'tag_public');

INSERT INTO courts (id, name, description, address, postcode, borough, latitude, longitude, status)
VALUES ('court_299o0xenbe7', 'Ealing Road Court', 'Full court with concrete floor in Wembley. North West London location.', 'Ealing Road, Wembley', 'HA0 4LW', 'Brent', 51.5505, -0.3036, 'approved');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_299o0xenbe7', 'tag_outdoor');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_299o0xenbe7', 'tag_concrete');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_299o0xenbe7', 'tag_free');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_299o0xenbe7', 'tag_fullcourt');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_299o0xenbe7', 'tag_public');

INSERT INTO courts (id, name, description, address, postcode, borough, latitude, longitude, status)
VALUES ('court_zz8f93ol24a', 'Marlowe Road', 'Outdoor public court in Walthamstow. East London basketball spot.', 'Marlowe Road, Walthamstow', 'E17 6EJ', 'Waltham Forest', 51.5903, -0.0236, 'approved');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_zz8f93ol24a', 'tag_outdoor');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_zz8f93ol24a', 'tag_concrete');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_zz8f93ol24a', 'tag_free');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_zz8f93ol24a', 'tag_public');

INSERT INTO courts (id, name, description, address, postcode, borough, latitude, longitude, status)
VALUES ('court_4fl7v3w07ik', 'Vestry Park', 'Multiple outdoor courts in Vestry Park with wheelchair access.', 'Vestry Road, Walthamstow', 'E17 9NH', 'Waltham Forest', 51.5857, -0.016, 'approved');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_4fl7v3w07ik', 'tag_outdoor');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_4fl7v3w07ik', 'tag_concrete');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_4fl7v3w07ik', 'tag_free');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_4fl7v3w07ik', 'tag_fullcourt');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_4fl7v3w07ik', 'tag_public');

INSERT INTO courts (id, name, description, address, postcode, borough, latitude, longitude, status)
VALUES ('court_zrewo8iqqsd', 'Wood Street Ball Court', 'Outdoor public ball court on Wood Street in Walthamstow.', 'Wood Street, Walthamstow', 'E17 3HX', 'Waltham Forest', 51.5889, -0.0019, 'approved');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_zrewo8iqqsd', 'tag_outdoor');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_zrewo8iqqsd', 'tag_concrete');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_zrewo8iqqsd', 'tag_free');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_zrewo8iqqsd', 'tag_public');

INSERT INTO courts (id, name, description, address, postcode, borough, latitude, longitude, status)
VALUES ('court_74ppt8804iq', 'Kennington Park', 'Outdoor court in historic Kennington Park. Great for basketball in South London.', 'Kennington Park, Kennington Park Road', 'SE11 4BE', 'Lambeth', 51.4834, -0.1067, 'approved');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_74ppt8804iq', 'tag_outdoor');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_74ppt8804iq', 'tag_concrete');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_74ppt8804iq', 'tag_free');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_74ppt8804iq', 'tag_public');

INSERT INTO courts (id, name, description, address, postcode, borough, latitude, longitude, status)
VALUES ('court_3h5ii7gsw4l', 'Shoreditch Park', 'Popular outdoor basketball court in the heart of Shoreditch. Blends local talent with urban culture and international flair.', 'Shoreditch Park, New North Road', 'N1 6TA', 'Hackney', 51.536, -0.0794, 'approved');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_3h5ii7gsw4l', 'tag_outdoor');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_3h5ii7gsw4l', 'tag_concrete');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_3h5ii7gsw4l', 'tag_free');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_3h5ii7gsw4l', 'tag_fullcourt');
INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('court_3h5ii7gsw4l', 'tag_public');


-- Total courts: 25
