package main

import (
	"context"
	"fmt"
	"os"
	"path/filepath"
	rt "runtime"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) GetFilesByPickingDirectory(recursive bool) []string {
	dirPath, _ := runtime.OpenDirectoryDialog(a.ctx, runtime.OpenDialogOptions{})
	fmt.Println(dirPath)

	var files []string

	if dirPath != "" {
		filepath.Walk(dirPath, func(path string, info os.FileInfo, err error) error {
			if err != nil {
				return err
			}

			// If not recursive, skip subdirectories
			if !recursive && info.IsDir() && path != dirPath {
				return filepath.SkipDir
			}

			if !info.IsDir() {
				absPath, err := filepath.Abs(path)
				if err != nil {
					return err
				}
				files = append(files, absPath)
			}

			return nil
		})

	}

	return files
}

func (a *App) GetFilesByPickingFiles() []string {
	filePaths, _ := runtime.OpenMultipleFilesDialog(a.ctx, runtime.OpenDialogOptions{})
	if filePaths == nil {
		return []string{}
	}
	return filePaths
}

// Renamee a file.
//
// if `srcPath` equals `newPath`, return `NoChange`.
// if `srcPath` not exists, return `SrcNotExists`.
// if `newPath` exists, return `DestExists`.
// if rename failed, return `Error`.
// if rename success, return `Success`.
func (a *App) RenameFile(srcPath string, destPath string) string {
	if srcPath == destPath {
		return "NoChange"
	}

	oldFileInfo, err := os.Stat(srcPath)
	if os.IsNotExist(err) {
		return "SrcNotExists"
	}

	if newFIleInfo, err := os.Stat(destPath); err == nil {
		if !os.SameFile(oldFileInfo, newFIleInfo) {
			return "DestExists"
		}
	}

	if err := os.Rename(srcPath, destPath); err != nil {
		return "Error"
	}

	return "Success"
}

// 是否 Mac 系统
func (a *App) IsMac() bool {
	return rt.GOOS == "darwin"
}
