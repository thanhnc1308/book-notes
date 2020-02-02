// When you have an interface with a single method that doesn’t return anything, there’s a good chance it’s the Command pattern.

// First, define a base class that represents a triggerable command
class Command {
    constructor() {}

    execute() {
        throw new Error("Not implementation");
    }
}

// create subclasses for each of the different actions
class JumpCommand extends Command {
    execute() {
        this.jump();
    }

    jump() {
        console.log('Jump');
    }
}

class FireCommand extends Command {
    execute() {
        this.fire();
    }

    fire() {
        console.log('Fire');
    }
}

// In our input handler, we store a variable to a command for each action

class Handler {
    constructor() {
        let me = this;
        me.jumpCommand = new JumpCommand();
        me.fireCommand = new FireCommand();
    }

    handle() {
        let me = this;
        if (me.getCommand() === 1) {
            me.jumpCommand.execute();
        } else {
            me.fireCommand.execute();
        }
    }

    getCommand() {
        return 1;
    }
}

new Handler().handle();