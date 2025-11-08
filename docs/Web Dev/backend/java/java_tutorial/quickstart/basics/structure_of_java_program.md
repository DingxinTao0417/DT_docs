# Basic Structure of a Java Program

Let’s first analyze the structure of a complete Java program — what does its basic structure look like:

/**
 * This is a comment used for auto-generated documentation
 */
public class Hello {
    public static void main(String[] args) {
        // Output text to the screen:
        System.out.println("Hello, world!");
        /* Multi-line comment starts
        Comment content
        Multi-line comment ends */
    }
} // end of class definition


Because Java is an object-oriented language, the basic unit of a program is a class.
class is a keyword, and the name of the class here is Hello:

public class Hello { // class name is Hello
    // ...
} // end of class definition

Rules for class names:

Must start with an English letter, followed by letters, digits, or underscores

Usually start with an uppercase letter (industry convention)

Good class names:

Hello

NoteBook

VRPlayer

Bad class names:

hello

Good123

Note_Book

_World

Notice that public is an access modifier, meaning the class is public (visible).

Even without public, the code can compile — but it cannot be run directly from the command line.

Methods inside a class

Inside a class, you can define multiple methods:

public class Hello {
    public static void main(String[] args) { // method name is main
        // method code...
    } // end of method definition
}


A method defines a set of execution statements. The code inside a method runs in order.

Here, the method name is main, its return value is void, meaning no return value.

public can also modify methods.
static is another keyword — it means this is a static method.

For now, you only need to remember:

The entry point of a Java program must be a static method named main,
and the parameter must be a String array.

Method naming rules

Similar to class naming, but starts with lowercase:

Good method names:

main

goodMorning

playVR

Bad method names:

Main

good123

good_morning

_playVR

Inside a method, statements are the real executable code. Every Java statement must end with a semicolon:

public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, world!"); // statement
    }
}

Comments in Java

Comments are text for humans to read, not part of the program.
The compiler ignores comments.

Java has three types of comments.

Single-line comment

Starts with //

// this is a comment...

Multi-line comment

Starts with /* and ends with */:

/*
This is a comment
blablabla...
This is also a comment
*/

Documentation comment (special multi-line)

Starts with /** and ends with */.
If there are multiple lines, each line usually starts with *:

/**
 * This can be used for auto-generated documentation
 * 
 * @author liaoxuefeng
 */
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, world!");
    }
}


This type of comment is written before class or method definitions and can be used to generate documentation automatically.

Code formatting

Java does not have strict formatting requirements.
Extra spaces or line breaks do not affect correctness.

However, we should follow standard coding conventions and keep clean formatting.

Eclipse IDE provides a shortcut Ctrl + Shift + F (macOS: ⌘ + ⇧ + F) to auto-format code, based on Java’s community formatting conventions.

You can find the detailed formatting rules in Eclipse under:

Preferences → Java → Code Style