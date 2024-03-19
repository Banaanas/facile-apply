import { prisma } from "@prisma/db.server";
import colors from "colors";

// Executes a basic database query as a preliminary check to ensure database availability.
// This approach is resource-efficient, as it avoids expending computational and network resources on data scraping tasks
// that cannot be completed due to database unavailability, thereby optimizing operational costs.

export const checkDatabaseConnection = async () => {
  try {
    // Attempt a simple query - Fetching the first job
    await prisma.indeedJob.findFirst();
    console.log(colors.green("Database is up and running."));
    await prisma.$disconnect();
  } catch (error) {
    console.log(
      colors.red(
        "Failed to connect to the database. Ensure the Docker database container is running.",
      ),
    );
    // Terminates the process if the database is not accessible, preventing the initiation of web scraping activities.
    process.exit(1);
  }
};
