export default {
  id: '4707894249cbe44b7fd142bdb87fe90e',
  name: 'HackSesh1',
  coaches: [
    { id: '01aabb508501c28a98b8cf7268260913', name: 'Coach coach', username: 'CoachHackCoach' },
    {
      id: '5c96112201d5ab0a24982f7a2d473233',
      name: 'Another Coach',
      username: 'AnotherCoachHackCoach',
    },
  ],
  learners: [
    { id: 'dbfffe45c6728ce9fea834f5c22a56bf', name: 'A', username: 'AHacks' },
    { id: '6ec2cae486c0e4c261f613679493eebc', name: 'B', username: 'BHacks' },
    { id: 'edd265c283d730c293f30210316756bf', name: 'C', username: 'CHacks' },
    { id: '4b1c478c5b1abaa02795022fcd1cce64', name: 'D', username: 'DHacks' },
    { id: '497adae79fe6ae7ce5d4e8e334d3e1d6', name: 'E', username: 'EHacks' },
    { id: '1a91e06a08b0f0c8e2244b06e971afa2', name: 'F', username: 'FHacks' },
    { id: '46f8737c3c4a389be236ac91f6e9e90c', name: 'G', username: 'GHacks' },
    { id: '08398c7a922e6544e48ccc48a32c78fa', name: 'H', username: 'HHacks' },
    { id: '21a4e212cf7d3390960bfbe9ec5340a4', name: 'I', username: 'IHacks' },
    { id: 'e5fbe1b7df091ccf71985b412ff93f7e', name: 'J', username: 'JHacks' },
    { id: '905a13b28ce7e33a46dcdc94f9d7ac46', name: 'K', username: 'KHacks' },
    { id: '95f77340b4c1ad299934bc7752cb37c8', name: 'L', username: 'LHacks' },
    { id: '3e996995ce5555c4e62f69e2374a62a7', name: 'M', username: 'MHacks' },
    { id: '8c92ba7f6fb88a11bce6427cad2fc921', name: 'N', username: 'NHacks' },
    { id: 'db6a72b70250db5ed2d69955eece98bd', name: 'O', username: 'OHacks' },
    { id: '3464d9eb39989076f59a22f6fbcd3260', name: 'P', username: 'PHacks' },
    { id: '9a0caacac19f290bfdd175298772660c', name: 'Q', username: 'QHacks' },
  ],
  groups: [
    { id: 'e99f0508d11644d39bffcfecf9209f83', name: 'SCHOOL 1', member_ids: [] },
    {
      id: '8d2e8c66c05004657d676155dd0b305d',
      name: 'SCHOOL 1',
      member_ids: [
        '08398c7a922e6544e48ccc48a32c78fa',
        '3e996995ce5555c4e62f69e2374a62a7',
        '497adae79fe6ae7ce5d4e8e334d3e1d6',
        '6ec2cae486c0e4c261f613679493eebc',
        '95f77340b4c1ad299934bc7752cb37c8',
        'db6a72b70250db5ed2d69955eece98bd',
      ],
    },
    {
      id: 'c4625c3fef6b7d918e9417d92e482e6f',
      name: 'SCHOOL 2',
      member_ids: [
        '1a91e06a08b0f0c8e2244b06e971afa2',
        '21a4e212cf7d3390960bfbe9ec5340a4',
        '46f8737c3c4a389be236ac91f6e9e90c',
        '8c92ba7f6fb88a11bce6427cad2fc921',
        '9a0caacac19f290bfdd175298772660c',
        'dbfffe45c6728ce9fea834f5c22a56bf',
      ],
    },
    {
      id: '7c20f664b6a5c43d64b0cdd3161be513',
      name: 'SCHOOL 3',
      member_ids: [
        '3464d9eb39989076f59a22f6fbcd3260',
        '4b1c478c5b1abaa02795022fcd1cce64',
        '905a13b28ce7e33a46dcdc94f9d7ac46',
        'e5fbe1b7df091ccf71985b412ff93f7e',
        'edd265c283d730c293f30210316756bf',
      ],
    },
  ],
  exams: [
    {
      id: '31b700a2c35a0285f8c84767ed4f4e0a',
      title: 'SCHOOL - B',
      active: true,
      question_sources: [
        { exercise_id: '2a722a9e57575148bc55deed7550ed62', question_id: '1' },
        { exercise_id: '2a722a9e57575148bc55deed7550ed62', question_id: '2' },
        { exercise_id: '2a722a9e57575148bc55deed7550ed62', question_id: '3' },
      ],
      groups: ['c4625c3fef6b7d918e9417d92e482e6f'],
      data_version_model: 1,
      question_count: 3,
    },
    {
      id: 'd7033a1cb888493763dc9b5f3ab2505b',
      title: 'SCHOOL - A',
      active: true,
      question_sources: [
        { exercise_id: 'eadec7f803994b6eb8f401237ec0f777', question_id: 'A' },
        { exercise_id: 'eadec7f803994b6eb8f401237ec0f777', question_id: 'B' },
      ],
      groups: ['8d2e8c66c05004657d676155dd0b305d'],
      data_version_model: 1,
      question_count: 2,
    },
    {
      id: '4018bcea43cee3d05811b641fca0b152',
      title: 'SCHOOL - C',
      active: true,
      question_sources: [
        { exercise_id: '7ca5649898d85d8b96672fbf4059df22', question_id: '10' },
        { exercise_id: '9f098fe61d8752f19fc815e1ac87f1b6', question_id: '11' },
        { exercise_id: '3a655a4b8adb5114a571dfd0c75cbc19', question_id: '12' },
      ],
      groups: ['7c20f664b6a5c43d64b0cdd3161be513'],
      data_version_model: 1,
      question_count: 3,
    },
    {
      id: '97316f077d470b45e912096edb534076',
      title: 'Program A',
      active: true,
      question_sources: [
        { exercise_id: '9baf781e43b0514085cc205176b0ee71', question_id: 'x' },
        { exercise_id: '9baf781e43b0514085cc205176b0ee71', question_id: 'y' },
        { exercise_id: '9baf781e43b0514085cc205176b0ee71', question_id: 'z' },
      ],
      groups: [],
      data_version_model: 1,
      question_count: 3,
    },
  ],
  exam_learner_status: [
    {
      exam_id: '31b700a2c35a0285f8c84767ed4f4e0a',
      learner_id: 'dbfffe45c6728ce9fea834f5c22a56bf',
      status: 'Completed',
      last_activity: '2019-01-24 23:14:52.831000+00:00',
      num_correct: 1,
    },
    {
      exam_id: '31b700a2c35a0285f8c84767ed4f4e0a',
      learner_id: '9a0caacac19f290bfdd175298772660c',
      status: 'Completed',
      last_activity: '2019-01-24 23:04:26.540000+00:00',
      num_correct: 2,
    },
    {
      exam_id: 'd7033a1cb888493763dc9b5f3ab2505b',
      learner_id: '6ec2cae486c0e4c261f613679493eebc',
      status: 'Started',
      last_activity: '2019-01-24 23:00:08.771000+00:00',
      num_correct: 2,
    },
    {
      exam_id: '97316f077d470b45e912096edb534076',
      learner_id: '4b1c478c5b1abaa02795022fcd1cce64',
      status: 'Completed',
      last_activity: '2019-01-24 22:34:39.693000+00:00',
      num_correct: 0,
    },
    {
      exam_id: '97316f077d470b45e912096edb534076',
      learner_id: 'edd265c283d730c293f30210316756bf',
      status: 'Completed',
      last_activity: '2019-01-24 22:31:56.584000+00:00',
      num_correct: 2,
    },
    {
      exam_id: '4018bcea43cee3d05811b641fca0b152',
      learner_id: 'e5fbe1b7df091ccf71985b412ff93f7e',
      status: 'Completed',
      last_activity: '2019-01-24 23:15:40.569000+00:00',
      num_correct: 2,
    },
    {
      exam_id: '97316f077d470b45e912096edb534076',
      learner_id: 'dbfffe45c6728ce9fea834f5c22a56bf',
      status: 'Completed',
      last_activity: '2019-01-24 22:32:25.970000+00:00',
      num_correct: 2,
    },
    {
      exam_id: 'd7033a1cb888493763dc9b5f3ab2505b',
      learner_id: '497adae79fe6ae7ce5d4e8e334d3e1d6',
      status: 'Completed',
      last_activity: '2019-01-24 23:12:37.858000+00:00',
      num_correct: 2,
    },
    {
      exam_id: '97316f077d470b45e912096edb534076',
      learner_id: 'e5fbe1b7df091ccf71985b412ff93f7e',
      status: 'Completed',
      last_activity: '2019-01-24 22:33:44.351000+00:00',
      num_correct: 2,
    },
    {
      exam_id: '97316f077d470b45e912096edb534076',
      learner_id: '6ec2cae486c0e4c261f613679493eebc',
      status: 'Completed',
      last_activity: '2019-01-24 22:45:13.097000+00:00',
      num_correct: 2,
    },
    {
      exam_id: '97316f077d470b45e912096edb534076',
      learner_id: '905a13b28ce7e33a46dcdc94f9d7ac46',
      status: 'NotStarted',
      last_activity: '2019-01-24 22:42:38.471000+00:00',
      num_correct: null,
    },
    {
      exam_id: '97316f077d470b45e912096edb534076',
      learner_id: '1a91e06a08b0f0c8e2244b06e971afa2',
      status: 'Completed',
      last_activity: '2019-01-24 22:35:15.068000+00:00',
      num_correct: 2,
    },
    {
      exam_id: '4018bcea43cee3d05811b641fca0b152',
      learner_id: 'edd265c283d730c293f30210316756bf',
      status: 'Completed',
      last_activity: '2019-01-24 23:12:54.385000+00:00',
      num_correct: 2,
    },
    {
      exam_id: '97316f077d470b45e912096edb534076',
      learner_id: '497adae79fe6ae7ce5d4e8e334d3e1d6',
      status: 'Completed',
      last_activity: '2019-01-24 22:32:07.956000+00:00',
      num_correct: 2,
    },
    {
      exam_id: 'd7033a1cb888493763dc9b5f3ab2505b',
      learner_id: 'db6a72b70250db5ed2d69955eece98bd',
      status: 'Completed',
      last_activity: '2019-01-24 23:11:49.782000+00:00',
      num_correct: 1,
    },
    {
      exam_id: '97316f077d470b45e912096edb534076',
      learner_id: 'db6a72b70250db5ed2d69955eece98bd',
      status: 'Completed',
      last_activity: '2019-01-24 22:34:10.329000+00:00',
      num_correct: 1,
    },
    {
      exam_id: '4018bcea43cee3d05811b641fca0b152',
      learner_id: '4b1c478c5b1abaa02795022fcd1cce64',
      status: 'Completed',
      last_activity: '2019-01-24 23:11:46.956000+00:00',
      num_correct: 2,
    },
    {
      exam_id: '4018bcea43cee3d05811b641fca0b152',
      learner_id: '905a13b28ce7e33a46dcdc94f9d7ac46',
      status: 'Completed',
      last_activity: '2019-01-24 23:03:17.930000+00:00',
      num_correct: 1,
    },
  ],
  content: [
    {
      node_id: 'dce323f82b4d4d2f8b3932ce0cd2b742',
      content_id: '05a14c4b179a4942bf61f02cfdeb682e',
      title: 'aesop_fables',
      kind: 'document',
    },
    {
      node_id: '7d558f4a74fb4f8a91e9a605c7c3f247',
      content_id: '4a1693457453429c8f43a6e392098ecd',
      title: 'arthur-conan-doyle_the-adventures-of-sherlock-holmes',
      kind: 'document',
    },
    {
      node_id: 'e5fd9c8618b046cd9d1c81381ae9b1cb',
      content_id: 'dde6e2efc4b74d5094357c42a7bd51b1',
      title: 'arthur-conan-doyle_the-hound-of-the-baskervilles',
      kind: 'document',
    },
    {
      node_id: '15cfc6afe5b54089bdc3a353068531c4',
      content_id: '711dc0b9a0f24b4fa2b29a06b2dee8e5',
      title: 'Mata and I',
      kind: 'document',
    },
    {
      node_id: '1454aee2bbc059a0ba322f5b93c33f7b',
      content_id: 'bf0f8f23d8565834a127ee21ece0d0d0',
      title: 'Expression Exchange',
      kind: 'html5',
    },
    {
      node_id: '6b3b88d2dc75517aad9bd014382c9377',
      content_id: 'ec46c847e3d2520c862337f5e99350ce',
      title: 'Make a Ten',
      kind: 'html5',
    },
    {
      node_id: '53ae8c684e875469a770d9ecbe478cba',
      content_id: 'fe64db5a5335545aa658b443ad5d634d',
      title: "Ajouter des nombres jusqu'à 5",
      kind: 'exercise',
    },
    {
      node_id: 'ebaac35501dd5a938e2853a8c70dc78a',
      content_id: '0766368ee8f55c35949cb25ac91e8bb5',
      title: "Soustraire des nombres jusqu'à 5",
      kind: 'exercise',
    },
    {
      node_id: '80e5aebd71f55a8fa5bcbf3175385975',
      content_id: 'a3ad18b2c99d5d0bbc05d5653dca7e0b',
      title: " Les bases de l'addition ",
      kind: 'video',
    },
    {
      node_id: 'f9a20c94a46d559199130ac99e32cb28',
      content_id: 'd86ef77f4e865e4682f477962ac68acd',
      title: 'Addition de vecteurs dans le plan',
      kind: 'video',
    },
    {
      node_id: 'b82b567cb3b0597d95dce78add12c20f',
      content_id: '6e7ad2ed064253f5a5562318aebb83bd',
      title: 'Addition of water (acid-catalyzed) mechanism (en anglais)',
      kind: 'video',
    },
    {
      node_id: 'e1122220db255a5e98cca4f417ecd06d',
      content_id: '0dfcd0dd6eff54e9baf9e45df2434cd9',
      title: 'Look at the Clock and Tell the Time Practice',
      kind: 'exercise',
    },
    {
      node_id: '9689c93001f455e39f3ce5ce49c9cf8c',
      content_id: 'b4c5c254bc755f1e8773940e3eac9d87',
      title: 'Identifying Rectangles, Squares, Circles, and Triangles Practice',
      kind: 'exercise',
    },
    {
      node_id: '2a722a9e57575148bc55deed7550ed62',
      content_id: 'ad7e08f296ec5e3689ecd3d7f667d5da',
      title: 'Numbers to 120',
      kind: 'exercise',
    },
    {
      node_id: '9f098fe61d8752f19fc815e1ac87f1b6',
      content_id: '433285b2b27f5ef088111fb3bcec530b',
      title: 'Equal sign',
      kind: 'exercise',
    },
    {
      node_id: '3a655a4b8adb5114a571dfd0c75cbc19',
      content_id: '65eb0d8df64e5149a615db821899845d',
      title: 'Word problems with "more" and "fewer" 2',
      kind: 'exercise',
    },
    {
      node_id: '7ca5649898d85d8b96672fbf4059df22',
      content_id: '9e6d7b0db3005138b4c9393f2ca16794',
      title: 'Add 1s or 10s (no regrouping)',
      kind: 'exercise',
    },
    {
      node_id: '8d1e7316ccdc5021a004cb5b9f784c1e',
      content_id: '04c2ad2882dc5d50959736009df58a84',
      title: 'Repeated addition: haircuts',
      kind: 'video',
    },
    {
      node_id: '3b631e45182459bab211c21fb5cfab65',
      content_id: '52afd859b8df5bb1a6a834ddaeaf3f23',
      title: 'Repeated addition',
      kind: 'exercise',
    },
    {
      node_id: 'e851ffe2b343540f9ecaf1aca8626f48',
      content_id: '5af7b054ad035252a354b8ff7bb1f319',
      title: 'Adding and subtracting on number line word problems',
      kind: 'video',
    },
    {
      node_id: 'b3daea92e0265408bb5cc72857968d3d',
      content_id: '2f38b99b355a5cd79b3d8a8a7348f824',
      title: 'Add and subtract on the number line word problems',
      kind: 'exercise',
    },
    {
      node_id: '9baf781e43b0514085cc205176b0ee71',
      content_id: 'c12e000d21e450a098c3e5b3e5f1fd22',
      title: 'Name angles',
      kind: 'exercise',
    },
    {
      node_id: '0a347e0a8e104bf9978b974a3817da67',
      content_id: 'db023ba0e7a855a59266a3c1371fa1da',
      title: 'Overview of Telling Time to Quarter and Hour',
      kind: 'video',
    },
    {
      node_id: '46af3fcdf8425a59be74c7285a1bb26d',
      content_id: '5e9ed316c63052a28ee0270303ad8dfa',
      title: 'Puzzle',
      kind: 'html5',
    },
    {
      node_id: '0344aac58bd2552685ab69a6d05ed222',
      content_id: '5eda4d1e843a50ea883722cb6fe62f93',
      title: 'Paneer ( indian cheese )',
      kind: 'video',
    },
    {
      node_id: '2caa381c3b2549efb9b0ceff788187a3',
      content_id: 'fbced9d1c5945f4da7a997a5d8d59676',
      title: 'Overview of Addition (Sums to 10)',
      kind: 'video',
    },
    {
      node_id: 'eadec7f803994b6eb8f401237ec0f777',
      content_id: 'cb6a1323117455dca7522149f195becc',
      title: 'Adding Sentences (Sums to 10) Practice',
      kind: 'exercise',
    },
    {
      node_id: '31c2ba5caefb5951bbbc79ae76794dce',
      content_id: '5f121a1740c4575abcf73b18f9147ba5',
      title: 'Arseny’s family',
      kind: 'video',
    },
    {
      node_id: '2c3e00f364b145a99ba894d0a0f0cff7',
      content_id: 'e6ec14a26ecd49c59c283f55e0337a42',
      title: 'the diatonic braid',
      kind: 'document',
    },
    {
      node_id: 'c9ccd863e811540fba77619d66cf3ff3',
      content_id: '05c0e9efc6625a2489e2e9dd79da03f3',
      title: "'n Ernstige Ongeluk",
      kind: 'html5',
    },
    {
      node_id: 'aa785dc4ac2b5a1bb4209c70a00873ed',
      content_id: '607cce922ad15e7591d7bcd3237f6752',
      title: "'n Baie Lang Man",
      kind: 'html5',
    },
    {
      node_id: 'ce3c1eaae8e55b9b9fdcc48087519ea1',
      content_id: '9e2fc45ff0a25a8d9137a09dad159ed7',
      title: "'n Boontjiesaad",
      kind: 'html5',
    },
    {
      node_id: 'aafc65cf573e5e5695b3aa6fbc1b868c',
      content_id: 'ba268e99ef1d53f68cdd4e4f357dc88f',
      title: "'n Koei is my Vriend",
      kind: 'html5',
    },
  ],
  content_learner_status: [
    {
      learner_id: '1a91e06a08b0f0c8e2244b06e971afa2',
      content_id: '04c2ad2882dc5d50959736009df58a84',
      status: 'Completed',
      last_activity: '2019-01-24 22:41:29.288000+00:00',
      time_spent: 500.34,
    },
    {
      learner_id: '1a91e06a08b0f0c8e2244b06e971afa2',
      content_id: '52afd859b8df5bb1a6a834ddaeaf3f23',
      status: 'Completed',
      last_activity: '2019-01-24 22:43:15.790000+00:00',
      time_spent: 0.34,
    },
    {
      learner_id: '1a91e06a08b0f0c8e2244b06e971afa2',
      content_id: 'ec46c847e3d2520c862337f5e99350ce',
      status: 'NotStarted',
      last_activity: '2019-01-24 22:43:37.786000+00:00',
      time_spent: 4.34,
    },
    {
      learner_id: '1a91e06a08b0f0c8e2244b06e971afa2',
      content_id: '0dfcd0dd6eff54e9baf9e45df2434cd9',
      status: 'Completed',
      last_activity: '2019-01-24 22:47:10.710000+00:00',
      time_spent: 2323.34,
    },
    {
      learner_id: '497adae79fe6ae7ce5d4e8e334d3e1d6',
      content_id: 'ec46c847e3d2520c862337f5e99350ce',
      status: 'NotStarted',
      last_activity: '2019-01-24 23:17:24.102000+00:00',
      time_spent: 12232323233.34,
    },
    {
      learner_id: '497adae79fe6ae7ce5d4e8e334d3e1d6',
      content_id: '04c2ad2882dc5d50959736009df58a84',
      status: 'Started',
      last_activity: '2019-01-24 22:34:36.130000+00:00',
      time_spent: 123.34,
    },
    {
      learner_id: '497adae79fe6ae7ce5d4e8e334d3e1d6',
      content_id: '5af7b054ad035252a354b8ff7bb1f319',
      status: 'Completed',
      last_activity: '2019-01-24 23:06:09.415000+00:00',
      time_spent: 123.34,
    },
    {
      learner_id: '497adae79fe6ae7ce5d4e8e334d3e1d6',
      content_id: '2f38b99b355a5cd79b3d8a8a7348f824',
      status: 'Started',
      last_activity: '2019-01-24 23:12:07.371000+00:00',
      time_spent: 123.34,
    },

    {
      learner_id: 'edd265c283d730c293f30210316756bf',
      content_id: '52afd859b8df5bb1a6a834ddaeaf3f23',
      status: 'Completed',
      last_activity: '2019-01-24 22:46:29.200000+00:00',
      time_spent: 123.34,
    },
    {
      learner_id: 'edd265c283d730c293f30210316756bf',
      content_id: 'ec46c847e3d2520c862337f5e99350ce',
      status: 'NotStarted',
      last_activity: '2019-01-24 22:46:41.441000+00:00',
      time_spent: 123.34,
    },
    {
      learner_id: 'edd265c283d730c293f30210316756bf',
      content_id: 'db023ba0e7a855a59266a3c1371fa1da',
      status: 'Started',
      last_activity: '2019-01-24 22:49:46.776000+00:00',
      time_spent: 123.34,
    },
    {
      learner_id: 'edd265c283d730c293f30210316756bf',
      content_id: '0dfcd0dd6eff54e9baf9e45df2434cd9',
      status: 'Completed',
      last_activity: '2019-01-24 22:51:14.773000+00:00',
      time_spent: 123.34,
    },
    {
      learner_id: 'edd265c283d730c293f30210316756bf',
      content_id: 'b4c5c254bc755f1e8773940e3eac9d87',
      status: 'Completed',
      last_activity: '2019-01-24 22:56:56.586000+00:00',
      time_spent: 123.34,
    },
    {
      learner_id: 'edd265c283d730c293f30210316756bf',
      content_id: '5af7b054ad035252a354b8ff7bb1f319',
      status: 'Completed',
      last_activity: '2019-01-24 23:06:29.634000+00:00',
      time_spent: 123.34,
    },
    {
      learner_id: 'edd265c283d730c293f30210316756bf',
      content_id: '2f38b99b355a5cd79b3d8a8a7348f824',
      status: 'Completed',
      last_activity: '2019-01-24 23:12:29.257000+00:00',
      time_spent: 123.34,
    },
  ],
  lessons: [
    {
      id: '77c3daea1dcadbdb2f1b8e0a9d278a81',
      title: 'The Program 1',
      active: true,
      node_ids: [
        '8d1e7316ccdc5021a004cb5b9f784c1e',
        '3b631e45182459bab211c21fb5cfab65',
        '6b3b88d2dc75517aad9bd014382c9377',
      ],
      groups: ['8d2e8c66c05004657d676155dd0b305d'],
    },
    {
      id: '0e92348b8f47022f4374e172dc26713c',
      title: 'The Program 2',
      active: true,
      node_ids: ['0a347e0a8e104bf9978b974a3817da67', 'e1122220db255a5e98cca4f417ecd06d'],
      groups: ['c4625c3fef6b7d918e9417d92e482e6f'],
    },
    {
      id: '0c24f8d4aafcb1ff7f0e41634f0bec5d',
      title: 'The Program 3',
      active: true,
      node_ids: ['9689c93001f455e39f3ce5ce49c9cf8c'],
      groups: ['7c20f664b6a5c43d64b0cdd3161be513'],
    },
    {
      id: '8a2a49790a27e92e725549bdec975ec0',
      title: 'SCHOOL 1',
      active: true,
      node_ids: ['e851ffe2b343540f9ecaf1aca8626f48', 'b3daea92e0265408bb5cc72857968d3d'],
      groups: [],
    },
    {
      id: '90a60b6b9272cb4a27cbf888320bf5f4',
      title: 'J',
      active: false,
      node_ids: [],
      groups: [],
    },
    {
      id: '7d67f35f550755d32811e21efb38e791',
      title: 'test',
      active: false,
      node_ids: [
        'c9ccd863e811540fba77619d66cf3ff3',
        'aafc65cf573e5e5695b3aa6fbc1b868c',
        'aa785dc4ac2b5a1bb4209c70a00873ed',
        'ce3c1eaae8e55b9b9fdcc48087519ea1',
      ],
      groups: [],
    },
    {
      id: 'ce3d2b4da2b8daed1c88b4a3e7ccdea1',
      title: 'Testing',
      active: false,
      node_ids: [
        'dce323f82b4d4d2f8b3932ce0cd2b742',
        '7d558f4a74fb4f8a91e9a605c7c3f247',
        'e5fd9c8618b046cd9d1c81381ae9b1cb',
      ],
      groups: [],
    },
    {
      id: 'd66822ee6ca94ae3000624ed62d1643c',
      title: 'Mr. Stanforf',
      active: true,
      node_ids: [
        'dce323f82b4d4d2f8b3932ce0cd2b742',
        'c9ccd863e811540fba77619d66cf3ff3',
        '1454aee2bbc059a0ba322f5b93c33f7b',
        '2caa381c3b2549efb9b0ceff788187a3',
      ],
      groups: [],
    },
    {
      id: '640ccb57a8a44f0e7ff166f8b9cadca5',
      title: 'test',
      active: false,
      node_ids: [],
      groups: [],
    },
    {
      id: 'bc26589a371b5848f6169065a190b49d',
      title: 'Altogether now',
      active: true,
      node_ids: [
        '0344aac58bd2552685ab69a6d05ed222',
        '31c2ba5caefb5951bbbc79ae76794dce',
        '46af3fcdf8425a59be74c7285a1bb26d',
        '2c3e00f364b145a99ba894d0a0f0cff7',
      ],
      groups: [],
    },
    {
      id: 'a1dfe9924c66ed5dc97a3328cddac321',
      title: 'L E S S O N',
      active: false,
      node_ids: [
        '53ae8c684e875469a770d9ecbe478cba',
        'ebaac35501dd5a938e2853a8c70dc78a',
        '80e5aebd71f55a8fa5bcbf3175385975',
        'f9a20c94a46d559199130ac99e32cb28',
        'b82b567cb3b0597d95dce78add12c20f',
      ],
      groups: [],
    },
    {
      id: 'f239935e386819c003316c66696e7610',
      title: 'Lesson for Coach',
      active: true,
      node_ids: ['15cfc6afe5b54089bdc3a353068531c4', 'c9ccd863e811540fba77619d66cf3ff3'],
      groups: [],
    },
    {
      id: '827e7acdafc51a6b5a666edd5b10c6c9',
      title: 'test',
      active: false,
      node_ids: [],
      groups: [],
    },
    {
      id: 'b533619fc6b6dd5a8ad0c20483941241',
      title: 'bla 😍',
      active: false,
      node_ids: ['53ae8c684e875469a770d9ecbe478cba', 'c9ccd863e811540fba77619d66cf3ff3'],
      groups: [],
    },
    {
      id: 'fbb582096477e51610b68687612d6a66',
      title: 'bla',
      active: false,
      node_ids: ['dce323f82b4d4d2f8b3932ce0cd2b742'],
      groups: [],
    },
  ],
};
