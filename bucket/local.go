package bucket

import (
	"os"
	"io"
	"log"
)

type LocalBucket struct {
	directory string
}

func NewLocalBucket(directory string) LocalBucket {
	err := os.MkdirAll(directory, os.ModePerm)
	if err != nil {
		log.Fatal(err)
	}

	return LocalBucket {
		directory: directory,
	}
}

func (bkt LocalBucket) ReadFile(name string) (io.Reader, error) {
	return os.Open(bkt.directory + name)
}

func (bkt LocalBucket) RemoveFile(name string) error {
	return os.Remove(bkt.directory + name)
}

func (bkt LocalBucket) WriteFile(name string, r io.Reader) error {
	f, err := os.Create(bkt.directory + name)
	if err != nil {
		return err
	}

	_, err = io.Copy(f, r)

	return err
}