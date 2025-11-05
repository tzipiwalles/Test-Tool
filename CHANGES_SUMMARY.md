# Fix for CSV Import Folder Validation Issue

## Problem Statement
When uploading a CSV file to the test library, tests were failing to import with errors like:
```
Create test "SASA V2V - TFLR Heuristic Probes": API 400 for http://127.0.0.1:8000/api/tests: {"detail":{"error":"Folder with ID f-20 not found"}}
```

This occurred when tests referenced folder IDs that didn't exist in the backend database.

## Root Cause
The CSV import process in `TestLibraryView.tsx` only supported `folderPath` column and would skip tests when folders didn't exist. However, it didn't support direct `folderId` references, and error messages weren't clear about why tests failed.

## Solution Implemented

### 1. Enhanced Folder Validation (TestLibraryView.tsx)
**Changes made:**
- Added support for both `folderPath` AND `folderId` columns in CSV imports
- Enhanced folder validation to check folder IDs before attempting test creation
- Improved error messages to clearly indicate which folder is missing and why

**Key improvements:**
```typescript
// Now supports both folderPath and folderId
const hasFolderPath = headers.includes('folderPath');
const hasFolderId = headers.includes('folderId');

// Validates folder ID exists in the system
if (hasFolderId && row.folderId) {
    if (folderIdSet.has(row.folderId)) {
        folderId = row.folderId;
    } else {
        skippedTests.push({
            row: index + 2,
            name: row.name,
            reason: `Folder with ID ${row.folderId} not found. Please ensure the folder exists before importing.`
        });
        return;
    }
}
```

### 2. Improved Error Reporting
**Before:**
```
⚠ 99 tests skipped (folder path not found)
```

**After:**
```
Import completed:
✓ 1 tests created
✓ 54 tests updated
✗ 99 tests failed

Failure details:
Create test "SASA V2V - TFLR Heuristic Probes": Folder with ID f-20 not found. Please ensure the folder exists before importing.
Create test "SASA V2V - TFLR CNN Probes": Folder with ID f-20 not found. Please ensure the folder exists before importing.
... and 96 more errors
```

The error format now matches the backend API error format, making it easier to diagnose issues.

### 3. Comprehensive Documentation
Created `CSV_IMPORT_GUIDE.md` with:
- Detailed CSV format specifications
- Examples for different use cases
- Troubleshooting guide
- Best practices

## Testing
- ✅ Build passes successfully
- ✅ No new TypeScript errors introduced
- ✅ Backward compatible with existing CSV format (folderPath)
- ✅ Forward compatible with new CSV format (folderId)

## Backward Compatibility
The changes are fully backward compatible:
- Existing CSVs with `folderPath` column continue to work
- New CSVs can use `folderId` column for direct folder references
- Both can be used together (folderId takes precedence)

## Files Changed
1. `components/TestLibraryView.tsx` - Enhanced CSV import logic
2. `CSV_IMPORT_GUIDE.md` - New documentation file

## Next Steps for Users
1. Review the folder structure in the Test Library
2. Ensure all folders referenced in CSV files exist before importing
3. Use the CSV_IMPORT_GUIDE.md to understand the proper CSV format
4. For CSV files with folder IDs like "f-20", either:
   - Create the missing folders first, OR
   - Update the CSV to reference existing folder IDs/paths

## Impact
- **Low risk**: Changes only affect CSV import functionality
- **High value**: Clearer error messages help users identify and fix issues faster
- **Extensible**: Foundation for future enhancements like automatic folder creation
