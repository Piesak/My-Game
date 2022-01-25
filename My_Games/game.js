 var config = {
   type: Phaser.AUTO,
   width: 800,
   heght: 600,
   physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};


var game = new Phaser.Game(config);
var cursors;
var keyboard;
var ninja;
var platforms;
function preload ()
{
   this.load.image( 'sky', 'assets/sky2.png');
   this.load.image('ground', 'assets/platform.png');
   this.load.image('star', 'assets/star.png');
   this.load.image('bomb', 'assets/bomb.png');
   this.load.spritesheet('ninja', 'assets/link.png',
   { frameWidth: 90, frameHeight: 100 });

   this.load.image('logo', 'assets/logo.png');

 }

 function create ()
 {
   console.log('Ready!');
   this.add.image(400, 480, 'sky');
  ninja = this.physics.add.sprite(400, 500, 'ninja').setScale(1);
  logo = this.add.image(400, 150, 'logo');
  var framenames = this.textures.get('ninja').getFrameNames();
  console.log(framenames);
platforms = this.physics.add.staticGroup();
platforms.create(400, 600, 'ground').setScale(1.2)
ninja.setBounce(0.2);
    ninja.setCollideWorldBounds(true);
this.physics.add.collider(ninja, platforms);
this.anims.create({
        key: 'left',
    frames: this.anims.generateFrameNumbers('ninja', { start: 9 , end: 12 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'ninja', frame: 0 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('ninja', { start: 30, end: 39 }),
        frameRate: 10,
        repeat: -1
    });

    cursors = this.input.keyboard.createCursorKeys();

}

 function update ()
 {
   if (cursors.left.isDown)
    {
        ninja.setVelocityX(-160);

        ninja.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        ninja.setVelocityX(160);

        ninja.anims.play('right', true);
    }
    else
    {
        ninja.setVelocityX(0);

        ninja.anims.play('turn', true);
    }

    if (cursors.up.isDown && ninja.body.touching.down)
    {
        ninja.setVelocityY(-330);
    }
}
