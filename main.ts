let playerImg = img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . f f . . . . . . . . . 
    . . . . . . . f f . . f . . . . 
    . . . . . f f f f f f f . . . . 
    . . . . . . . f f . . f . . . . 
    . . . . . 2 2 2 2 2 2 . . . . . 
    . . . . . 2 2 2 2 2 2 . . . . . 
    . . . . . 2 2 2 2 2 2 . . . . . 
    . . . . . 2 2 2 2 2 2 . . . . . 
    . . . . . 2 2 2 2 2 2 . . . . . 
    . . . . . 2 2 2 2 2 2 . . . . . 
    . . . . . 2 2 2 2 2 2 . . . . . 
    . . . . . 2 2 2 2 2 2 . . . . . 
    . . . . . 2 2 2 2 2 2 . . . . . 
    `
let fireImg = img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . 2 2 . . . . . . . 
    . . . . . 2 2 2 2 2 2 2 . . . . 
    . . . . . 2 5 2 2 4 4 2 . . . . 
    . . . . 2 2 2 5 5 5 5 2 2 . . . 
    . . . . 2 4 4 5 5 5 4 5 2 . . . 
    . . . . 4 4 2 2 2 2 4 4 2 2 . . 
    . . . 2 4 4 5 5 5 2 5 4 5 2 . . 
    . . . 2 4 4 4 5 5 2 2 4 4 2 . . 
    . . . 2 4 4 4 4 5 4 2 2 4 2 . . 
    . . . 2 2 4 4 4 4 4 2 2 4 2 . . 
    . . . . 2 5 5 2 2 2 2 2 2 . . . 
    . . . . 2 2 5 5 2 5 2 2 4 . . . 
    `
let waterImg = img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . 8 8 8 . . . . . . . 
    . . . . . . 8 6 6 8 8 . . . . . 
    . . . . . 8 6 6 6 6 8 8 . . . . 
    . . . . 8 8 6 6 6 6 6 8 . . . . 
    . . . . 8 8 6 6 6 6 8 8 . . . . 
    . . . . 8 8 6 9 9 6 6 6 8 . . . 
    . . . 8 8 6 6 9 9 9 9 6 8 8 . . 
    . . 8 8 6 6 9 9 9 9 9 6 6 8 . . 
    . . 8 6 6 6 9 8 8 9 6 6 6 8 . . 
    . . 8 8 8 6 9 8 9 9 6 6 8 8 . . 
    . . . 8 8 6 9 9 9 9 6 6 8 . . . 
    `
    scene.setBackgroundColor(12)

let player= sprites.create(playerImg, SpriteKind.Player)
controller.moveSprite(player) 
player.setPosition(20, 60)
player.setFlag(SpriteFlag.StayInScreen, true)

    info.setLife(4)
    info.startCountdown(10)

game.onUpdateInterval(1000, function() {
    let fire = sprites.create(fireImg, SpriteKind.Enemy)
    fire.setPosition(160, randint(0, 120))
    fire.setVelocity(randint(-100, -50), 0)
})

controller.A.onEvent(ControllerButtonEvent.Pressed, function() {
    let projectile = sprites.createProjectileFromSprite(waterImg, player, 50, 0)
})

sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function(sprite: Sprite, otherSprite: Sprite) {
    info.changeLifeBy(-1) 
    otherSprite.destroy()   
})

sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function(sprite: Sprite, otherSprite: Sprite) {
    sprite.destroy()  
    otherSprite.destroy()  
    info.changeScoreBy(1)
})

info.onCountdownEnd(function() {
    game.over(true)
})
