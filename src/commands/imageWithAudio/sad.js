const { downloadImage } = require('../../util/helper');
const GeneratorVideo = require('../../generator/GeneratorVideo');
const { filterBlackWhite } = require('../../util/helper');

module.exports = {
  name: 'sad',
  description: 'tambah lagu sad ke image',
  emoji: '😔',
  extraCommand: '[attachment atau link image]',
  async execute(message, text) {
    if (text === ' ' || text === '' || text == null) {
      return message.reply('coeg gambarnya mana :V').then(msg => {
        msg.delete({ timeout: 3000 });
      });
    }

    let url = null;

    message.attachments.size > 0
      ? message.attachments.map(attachment => {
          url = attachment.url;
        })
      : (url = text);

    await downloadImage(url, './src/img/imgAudio.png');
    filterBlackWhite('./src/img/imgAudio.png');

    const generatorImage = new GeneratorVideo(
      'sad',
      './src/img-output/imgAudio.png'
    );
    await generatorImage.generateVideo(message);
  },
};
