package Students;

import java.util.ArrayList;
import java.util.Scanner;

class Student {
    private String name;
    private int grade;

    public Student(String name, int grade) {
        this.name = name;
        this.grade = grade;
    }

    public String getName() {
        return name;
    }

    public int getGrade() {
        return grade;
    }

    public boolean hasPassed() {
        return grade >= 6;
    }
}

class StudentGradeManager {
    private ArrayList<Student> students = new ArrayList<>();

    public void addStudent(String name, int grade) {
        students.add(new Student(name, grade));
    }

    public Student searchStudent(String name) {
        for (Student student : students) {
            if (student.getName().equalsIgnoreCase(name)) {
                return student;
            }
        }
        return null;
    }

    public void displayPassFailStatistics() {
        int passCount = 0;
        int failCount = 0;

        for (Student student : students) {
            if (student.hasPassed()) {
                passCount++;
            } else {
                failCount++;
            }
        }

        System.out.println("Total Passed: " + passCount);
        System.out.println("Total Failed: " + failCount);
    }
}






package Students;

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        StudentGradeManager manager = new StudentGradeManager();

        while (true) {
            System.out.println("1. Add Student");
            System.out.println("2. Search Student");
            System.out.println("3. Display Pass/Fail Statistics");
            System.out.println("4. Exit");
            System.out.print("Choose an option: ");
            int option = scanner.nextInt();
            scanner.nextLine();  // Consume newline

            if (option == 1) {
                System.out.print("Enter student name: ");
                String name = scanner.nextLine();
                System.out.print("Enter student grade: ");
                int grade = scanner.nextInt();
                manager.addStudent(name, grade);
            } else if (option == 2) {
                System.out.print("Enter student name to search: ");
                String name = scanner.nextLine();
                Student student = manager.searchStudent(name);
                if (student != null) {
                    System.out.println(student.getName() + " has " + (student.hasPassed() ? "Passed" : "Failed"));
                } else {
                    System.out.println("Student not found.");
                }
            } else if (option == 3) {
                manager.displayPassFailStatistics();
            } else if (option == 4) {
                break;
            } else {
                System.out.println("Invalid option. Please try again.");
            }
        }

        scanner.close();
    }
}





























