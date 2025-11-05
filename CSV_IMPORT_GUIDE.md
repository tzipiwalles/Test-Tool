# CSV Import Guide for Test Library

This guide explains how to import tests into the Test Library using CSV files.

## CSV Format

The CSV file must include the following columns:

### Required Columns
- `name`: The name of the test (required)
- **One of the following**:
  - `folderId`: The ID of the folder where the test should be placed (e.g., "f-1", "f-2")
  - `folderPath`: The full path of the folder (e.g., "/Test Library/Smoke Tests")

### Optional Columns
- `id`: Test ID for updating existing tests
- `description`: Test description
- `steps`: Test steps in the format `action||expected@@action||expected` (use `@@` to separate steps, `||` to separate action and expected result)
- `labels`: Comma-separated list of labels
- `priority`: Test priority (P0, P1, P2, P3)
- `affectedObjectType`: Type of object being tested
- `testMethod`: Testing method used
- `estimated_duration_sec`: Estimated duration in seconds
- `map`: Map name
- `configuration`: Configuration name
- `status`: Test status (active, archived)

## Examples

### Example 1: Using Folder IDs
```csv
name,folderId,description,priority,labels
Login Test,f-1,Tests user login functionality,P0,smoke,auth
Logout Test,f-1,Tests user logout,P1,smoke,auth
```

### Example 2: Using Folder Paths
```csv
name,folderPath,description,priority,labels,steps
Verify Lane Detection,/Test Library/Regression Suite/Lane Mark,Detect white lane markings,P2,regression,Drive on road with white lane mark||Lane mark is detected and highlighted
Detect Curb,/Test Library/Regression Suite/Curb,Identify high curb,P2,regression,Approach high curb||Curb is detected and classified
```

### Example 3: Updating Existing Tests
```csv
id,name,folderId,description,priority
t-1,Updated Test Name,f-1,Updated description,P0
t-2,Another Updated Test,f-2,Another updated description,P1
```

## Import Behavior

### Folder Validation
- The import process validates all folder references **before** creating or updating any tests
- If a `folderId` is provided but doesn't exist, the test will be skipped
- If a `folderPath` is provided but doesn't exist, the test will be skipped
- Skipped tests are reported in the import summary

### Test Creation vs Update
- If the CSV includes an `id` column and the test exists, it will be **updated**
- If the CSV doesn't include an `id` column or the test doesn't exist, a **new test** will be **created**

### Error Handling
The import process provides detailed feedback:
- ✓ Number of tests created
- ✓ Number of tests updated
- ✗ Number of tests that failed (with detailed error messages)
- Details about which tests failed and why

Example error output:
```
Import completed:
✓ 1 tests created
✓ 54 tests updated
✗ 99 tests failed

Failure details:
Create test "SASA V2V - TFLR Heuristic Probes": Folder with ID f-20 not found. Please ensure the folder exists before importing.
Create test "SASA V2V - TFLR CNN Probes": Folder with ID f-20 not found. Please ensure the folder exists before importing.
Create test "SASA V2V - RART probes": Folder with ID f-20 not found. Please ensure the folder exists before importing.
... and 96 more errors
```

## Best Practices

1. **Validate folders first**: Ensure all folders referenced in your CSV exist in the Test Library before importing
2. **Use folderPath for clarity**: When exporting and re-importing, folder paths are more human-readable than IDs
3. **Use folderId for precision**: When you know the exact folder ID, using it directly avoids path ambiguity
4. **Test with small batches**: Import a small sample first to verify the format is correct
5. **Check the import summary**: Always review the import results to identify any issues

## Troubleshooting

### "Folder with ID X not found"
- The CSV references a folder ID that doesn't exist in the system
- Solution: Either create the folder first or update the CSV to use an existing folder ID

### "Folder path X does not exist"
- The CSV references a folder path that doesn't exist
- Solution: Create the folder structure first or update the CSV to use an existing path

### "CSV must include either 'folderPath' or 'folderId' column"
- The CSV is missing both folder identification columns
- Solution: Add either a `folderPath` or `folderId` column to your CSV

### "No tests to import"
- All tests in the CSV were skipped due to validation errors
- Solution: Review the detailed error messages and fix the issues in your CSV

## Exporting Tests

To export tests to CSV:
1. Click the "Export" button in the Test Library
2. The exported CSV will include all current tests with their folder paths
3. This CSV can be modified and re-imported
